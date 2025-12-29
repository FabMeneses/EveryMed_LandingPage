import { Component, ChangeDetectionStrategy, signal, inject, DestroyRef, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { throttleTime, debounceTime, filter } from 'rxjs/operators';
import { ViewportService } from '../../services/viewport.service';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full shrink-0',
    '[class.translate-y-full]': '!isVisible()',
    '[class.translate-y-0]': 'isVisible()'
  },
})
export class BottomNavComponent implements OnInit {
  // Services
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewportService = inject(ViewportService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // State
  protected readonly activeSection = signal<string>('inicio');
  protected readonly isVisible = signal<boolean>(true);
  protected readonly isBrowser = typeof window !== 'undefined';

  // Navigation items
  protected readonly navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home', ariaLabel: 'Ir a la sección de inicio' },
    { id: 'servicios', label: 'Servicios', icon: 'services', ariaLabel: 'Ir a la sección de servicios' },
    { id: 'planes', label: 'Planes', icon: 'plans', ariaLabel: 'Ir a la sección de planes' },
    { id: 'contacto', label: 'Contacto', icon: 'contact', ariaLabel: 'Ir a la sección de contacto' },
  ];

  // Intersection Observer for sections
  private sectionObserver?: IntersectionObserver;
  private lastScrollY = 0;
  private scrollTimeout?: any;
  private isUpdatingFromRouter = false;
  private isScrollingProgrammatically = false;
  private programmaticScrollTarget: string | null = null;
  private lockedSection: string | null = null; // Section locked during programmatic scroll

  constructor() {
    // Auto-hide on scroll down, show on scroll up
    effect(() => {
      if (!this.isBrowser) return;

      const isIOSSafari = this.viewportService.isIOS() && this.viewportService.isSafari();
      if (isIOSSafari) {
        // iOS Safari siempre visible para evitar problemas con safe-area
        this.isVisible.set(true);
      }
    });
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Initial section detection from URL
    this.updateActiveSectionFromUrl();

    // Setup Intersection Observer after DOM is ready
    // Use multiple attempts to ensure elements are loaded
    const setupObserver = () => {
      this.setupIntersectionObserver();
      // Fallback: if IntersectionObserver fails, use scroll-based detection
      if (!this.sectionObserver) {
        this.updateActiveSection();
      }
    };

    // Try immediately
    setTimeout(setupObserver, 100);
    
    // Retry after a longer delay in case components load slowly
    setTimeout(setupObserver, 500);
    
    // Final retry after components are definitely loaded
    setTimeout(setupObserver, 1000);

    // Listen to router navigation events (especially hash changes)
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: NavigationEnd) => {
        // Skip if we're updating from our own scrollToSection
        if (this.isUpdatingFromRouter) {
          this.isUpdatingFromRouter = false;
          return;
        }

        // Extract fragment from URL
        const fragment = event.urlAfterRedirects.split('#')[1];
        const baseUrl = event.urlAfterRedirects.split('#')[0];
        
        // Only update if we're on the home page
        if (baseUrl === '/') {
          if (fragment) {
            // Validate that the fragment matches one of our nav items
            const isValidSection = this.navItems.some(item => item.id === fragment);
            if (isValidSection) {
              // Mark as programmatic scroll to prevent interference
              this.isScrollingProgrammatically = true;
              this.programmaticScrollTarget = fragment;
              this.lockedSection = fragment;
              
              // Update active section immediately and lock it
              this.activeSection.set(fragment);
              
              // Check if section was reached after scroll completes
              setTimeout(() => {
                this.checkIfLockedSectionReached();
              }, 700);
            }
          } else {
            // On home page without fragment, set to inicio if at top
            if (window.scrollY < 100 && this.activeSection() !== 'inicio') {
              this.activeSection.set('inicio');
            }
          }
        }
      });

    // Optimized scroll listener with debounce
    // Always use scroll-based detection as primary method for better reliability
    fromEvent(window, 'scroll', { passive: true })
      .pipe(
        throttleTime(50),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.handleScroll();

        // Skip updating active section if we're scrolling programmatically and have a locked section
        if (this.isScrollingProgrammatically && this.lockedSection) {
          // Only update if user manually scrolled away from the locked section
          this.checkIfLockedSectionReached();
          return;
        }

        // Update active section with debounce
        // Use scroll-based detection as primary, IntersectionObserver as enhancement
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(() => {
          this.updateActiveSection();
        }, 100);
      });

    // Handle window resize
    fromEvent(window, 'resize', { passive: true })
      .pipe(
        debounceTime(200),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        // Re-setup observer on resize in case elements moved
        if (this.sectionObserver) {
          this.sectionObserver.disconnect();
          setTimeout(() => this.setupIntersectionObserver(), 100);
        } else {
          this.updateActiveSection();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  private setupIntersectionObserver(): void {
    if (!this.isBrowser || !('IntersectionObserver' in window)) {
      return;
    }

    // Disconnect existing observer if any
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-10% 0px -70% 0px', // Detect when section is in the top 20% of viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    this.sectionObserver = new IntersectionObserver((entries) => {
      // Skip if we're updating from router or scrolling programmatically with locked section
      if (this.isUpdatingFromRouter || (this.isScrollingProgrammatically && this.lockedSection)) {
        // But check if locked section was reached
        if (this.isScrollingProgrammatically && this.lockedSection) {
          this.checkIfLockedSectionReached();
        }
        return;
      }

      // Only update if we're on home page
      const currentUrl = this.router.url.split('#')[0];
      if (currentUrl !== '/') return;

      // Find the section with the highest intersection ratio in the viewport
      const visibleEntries = entries
        .filter(entry => {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          // Section is visible if it's in the top portion of the viewport
          return entry.isIntersecting && rect.top < viewportHeight * 0.3;
        })
        .sort((a, b) => {
          // Sort by how close to top of viewport (prefer sections higher up)
          const aTop = a.boundingClientRect.top;
          const bTop = b.boundingClientRect.top;
          if (Math.abs(aTop - bTop) < 50) {
            // If similar position, prefer higher intersection ratio
            return b.intersectionRatio - a.intersectionRatio;
          }
          return aTop - bTop;
        });

      if (visibleEntries.length > 0) {
        const sectionId = visibleEntries[0].target.id;
        if (sectionId && this.navItems.some(item => item.id === sectionId) && this.activeSection() !== sectionId) {
          this.activeSection.set(sectionId);
        }
      }
    }, options);

    // Observe all sections - retry if elements not found
    let foundCount = 0;
    this.navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        this.sectionObserver!.observe(element);
        foundCount++;
      }
    });

    // If no elements found, disable observer and use fallback
    if (foundCount === 0) {
      this.sectionObserver.disconnect();
      this.sectionObserver = undefined;
    }
  }

  private handleScroll(): void {
    if (!this.isBrowser) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);

    // Always keep visible - no auto-hide
    if (scrollDelta > 10) {
      this.isVisible.set(true);
    }

    this.lastScrollY = currentScrollY;
  }

  private updateActiveSectionFromUrl(): void {
    if (!this.isBrowser) return;

    // Check if we're on home page
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl !== '/') return;

    // Get fragment from URL
    const fragment = this.router.url.split('#')[1];
    if (fragment) {
      const isValidSection = this.navItems.some(item => item.id === fragment);
      if (isValidSection) {
        this.activeSection.set(fragment);
      }
    } else {
      // No fragment, check scroll position
      if (window.scrollY < 100) {
        this.activeSection.set('inicio');
      }
    }
  }

  private updateActiveSection(): void {
    if (!this.isBrowser) return;

    // Check if we're on home page
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl !== '/') return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * 0.25; // Section is active when it's in top 25% of viewport

    // Find which section is currently most visible in the viewport
    let activeSection: string | null = null;
    let bestScore = -Infinity;

    for (const item of this.navItems) {
      const element = document.getElementById(item.id);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementBottom = elementTop + rect.height;

      // Calculate how much of the section is visible in the trigger area
      const visibleTop = Math.max(0, scrollY);
      const visibleBottom = Math.min(scrollY + triggerPoint, elementBottom);
      const visibleHeight = Math.max(0, visibleBottom - Math.max(visibleTop, elementTop));

      // Score based on visibility and position
      // Higher score for sections that are more visible in the trigger area
      let score = 0;
      
      if (rect.top <= triggerPoint && rect.bottom >= 0) {
        // Section is in the trigger area
        score = visibleHeight / rect.height;
        
        // Bonus for sections closer to the top
        if (rect.top >= 0 && rect.top < triggerPoint) {
          score += (1 - rect.top / triggerPoint) * 0.5;
        }
        
        // Prefer sections that are more centered in the trigger area
        const centerY = rect.top + rect.height / 2;
        if (centerY >= 0 && centerY <= triggerPoint) {
          score += 0.3;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        activeSection = item.id;
      }
    }

    // Special cases
    // If at the very top, set to inicio
    if (scrollY < 50) {
      activeSection = 'inicio';
    }
    // If at bottom of page, set to contacto
    else if (scrollY + viewportHeight >= document.documentElement.scrollHeight - 50) {
      activeSection = 'contacto';
    }
    // If no section found but we're scrolled, default to the first visible section
    else if (!activeSection && scrollY > 100) {
      // Find first section that's partially visible
      for (const item of this.navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < viewportHeight && rect.bottom > 0) {
            activeSection = item.id;
            break;
          }
        }
      }
    }

    // Update if we found a section and it's different
    if (activeSection && this.activeSection() !== activeSection) {
      this.activeSection.set(activeSection);
    }
  }

  protected scrollToSection(section: string): void {
    if (!this.isBrowser) return;

    // Validate section exists
    const isValidSection = this.navItems.some(item => item.id === section);
    if (!isValidSection) {
      console.warn(`Section "${section}" not found in nav items`);
      return;
    }

    // Haptic feedback on supported devices
    this.triggerHapticFeedback();

    // Mark that we're scrolling programmatically to prevent scroll listener from interfering
    this.isScrollingProgrammatically = true;
    this.programmaticScrollTarget = section;
    this.lockedSection = section; // Lock the section until scroll completes

    // Update active section immediately and lock it
    this.activeSection.set(section);

    // Update URL with fragment for better navigation tracking
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/') {
      // Mark that we're updating from router to avoid circular updates
      this.isUpdatingFromRouter = true;
      
      // Update URL fragment without triggering navigation
      if (section === 'inicio') {
        // Remove fragment for inicio
        this.router.navigate([], { fragment: undefined, replaceUrl: true }).catch(() => {
          // Ignore navigation errors
        });
      } else {
        this.router.navigate([], { fragment: section, replaceUrl: true }).catch(() => {
          // Ignore navigation errors
        });
      }
    }

    // Function to perform the actual scroll
    const performScroll = () => {
      // Scroll to top for inicio
      if (section === 'inicio') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        
        // Verify scroll completed after animation
        setTimeout(() => {
          this.verifyScrollComplete(section);
        }, 600);
        return;
      }

      // Find element - retry if not found immediately
      let element = document.getElementById(section);
      
      if (!element) {
        // Retry after a short delay in case DOM is still loading
        setTimeout(() => {
          element = document.getElementById(section);
          if (element) {
            this.scrollToElement(element, section);
          } else {
            console.warn(`Element with id "${section}" not found`);
            this.isScrollingProgrammatically = false;
            this.programmaticScrollTarget = null;
          }
        }, 100);
        return;
      }

      this.scrollToElement(element, section);
    };

    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(performScroll);
    });
  }

  private scrollToElement(element: HTMLElement, section: string): void {
    const headerHeight = window.innerWidth >= 640 ? 64 : 56;
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const offsetPosition = elementTop - headerHeight;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });

    // Verify scroll completed after animation
    setTimeout(() => {
      this.verifyScrollComplete(section);
    }, 600);
  }

  private verifyScrollComplete(targetSection: string): void {
    // Check if we actually scrolled to the target section
    const element = document.getElementById(targetSection);
    if (element) {
      const rect = element.getBoundingClientRect();
      const headerHeight = window.innerWidth >= 640 ? 64 : 56;
      const isInPosition = Math.abs(rect.top - headerHeight) < 100; // Allow 100px tolerance
      
      if (isInPosition || (targetSection === 'inicio' && window.scrollY < 100)) {
        // Scroll completed successfully, unlock the section
        this.unlockSection();
        return;
      }
    }

    // If not in position yet, check again after a delay
    setTimeout(() => {
      this.checkIfLockedSectionReached();
    }, 200);
  }

  private checkIfLockedSectionReached(): void {
    if (!this.lockedSection) return;

    const element = document.getElementById(this.lockedSection);
    if (!element) {
      // Element not found, unlock anyway
      this.unlockSection();
      return;
    }

    const rect = element.getBoundingClientRect();
    const headerHeight = window.innerWidth >= 640 ? 64 : 56;
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * 0.25;

    // Check if the locked section is now in the trigger area
    const isInPosition = 
      (this.lockedSection === 'inicio' && window.scrollY < 100) ||
      (rect.top <= triggerPoint && rect.top >= -50 && rect.bottom > 0);

    if (isInPosition) {
      // Section reached, unlock it
      this.unlockSection();
    }
  }

  private unlockSection(): void {
    // Re-enable scroll listener after scroll animation completes
    this.isScrollingProgrammatically = false;
    this.programmaticScrollTarget = null;
    this.lockedSection = null;
    this.isUpdatingFromRouter = false;
    
    // Force update active section one more time to ensure accuracy
    setTimeout(() => {
      this.updateActiveSection();
    }, 100);
  }

  private triggerHapticFeedback(): void {
    if (!this.isBrowser) return;

    // Haptic feedback for supported browsers
    if ('vibrate' in navigator && this.viewportService.isMobile()) {
      try {
        navigator.vibrate(10); // Very subtle 10ms vibration
      } catch (e) {
        // Silently fail if not supported
      }
    }
  }

  protected isActive(section: string): boolean {
    return this.activeSection() === section;
  }

  protected trackByNavItem(index: number, item: NavItem): string {
    return item.id;
  }
}




