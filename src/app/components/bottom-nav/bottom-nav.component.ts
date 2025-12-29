import { Component, ChangeDetectionStrategy, signal, inject, DestroyRef, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { throttleTime, debounceTime } from 'rxjs/operators';
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

    // Setup Intersection Observer for better performance
    this.setupIntersectionObserver();

    // Initial section detection
    setTimeout(() => this.updateActiveSection(), 100);

    // Optimized scroll listener with debounce
    fromEvent(window, 'scroll', { passive: true })
      .pipe(
        throttleTime(100),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.handleScroll();

        // Update active section with debounce
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(() => {
          this.updateActiveSection();
        }, 150);
      });

    // Handle window resize
    fromEvent(window, 'resize', { passive: true })
      .pipe(
        debounceTime(200),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateActiveSection());
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

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Detect when section is ~40% visible
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    this.sectionObserver = new IntersectionObserver((entries) => {
      // Find most visible section
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0.1)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length > 0) {
        const sectionId = visibleEntries[0].target.id;
        if (sectionId && this.activeSection() !== sectionId) {
          this.activeSection.set(sectionId);
        }
      }
    }, options);

    // Observe all sections
    this.navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        this.sectionObserver!.observe(element);
      }
    });
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

  private updateActiveSection(): void {
    if (!this.isBrowser || this.sectionObserver) return; // IntersectionObserver handles this

    const sections = this.navItems.map(item => item.id);
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection.set(section);
          return;
        }
      }
    }

    // At bottom of page
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
      this.activeSection.set('contacto');
    }
  }

  protected scrollToSection(section: string): void {
    if (!this.isBrowser) return;

    // Haptic feedback on supported devices
    this.triggerHapticFeedback();

    // Scroll to top for inicio
    if (section === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      setTimeout(() => {
        this.activeSection.set(section);
      }, 300);
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      const headerHeight = window.innerWidth >= 640 ? 64 : 56;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });

      setTimeout(() => {
        this.activeSection.set(section);
      }, 300);
    }
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


