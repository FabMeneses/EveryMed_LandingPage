import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full shrink-0' },
})
export class HeaderComponent {
  private router = inject(Router);

  /**
   * Navigate to home and optionally scroll to a section.
   * If already on home page and same section, scroll to top.
   * If already on home page and different section, scroll to that section.
   */
  navigateToHome(sectionId?: string): void {
    const currentUrl = this.router.url.split('#')[0];
    const currentFragment = this.router.url.split('#')[1];
    const targetUrl = '/';

    if (currentUrl === targetUrl) {
      // Already on home page
      if (sectionId) {
        if (currentFragment === sectionId) {
          // Same section, scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Different section, scroll to it
          this.scrollToSection(sectionId);
        }
      } else {
        // No section specified, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Not on home page, navigate to it with optional fragment
      if (sectionId) {
        this.router.navigate([targetUrl], { fragment: sectionId }).then(() => {
          // Wait for navigation and DOM to be ready, then scroll
          // Angular may handle the fragment automatically, but we ensure it works
          setTimeout(() => {
            this.scrollToSection(sectionId);
          }, 200);
        });
      } else {
        this.router.navigate([targetUrl]).then(() => {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        });
      }
    }
  }

  /**
   * Scroll to section by ID
   */
  private scrollToSection(sectionId: string): void {
    // Try multiple times in case DOM is not ready yet
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Add offset for fixed header
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 50);
      }
    };
    
    tryScroll();
  }
}
