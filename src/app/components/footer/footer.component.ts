import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full shrink-0' },
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  private router = inject(Router);
  private location = inject(Location);

  /**
   * Map of section names to their corresponding routes
   */
  private sectionRoutes: Record<string, string> = {
    inicio: '/',
    servicios: '/#servicios',
    planes: '/#planes',
    contacto: '/#contacto',
    equipo: '/conocenos/equipo',
  };

  /**
   * Navigate to section or page.
   * If already on the same page, scroll to top.
   * If on a different page but same section in home, scroll to that section.
   * If on a completely different page, navigate to the target.
   */
  navigateToSection(sectionId: string): void {
    const targetRoute = this.sectionRoutes[sectionId];
    if (!targetRoute) return;

    const currentUrl = this.router.url;
    const targetUrl = targetRoute.split('#')[0];
    const targetFragment = targetRoute.split('#')[1];

    // Case 1: Already on the same page/route
    if (currentUrl.startsWith(targetUrl)) {
      // Scroll to top of current page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Case 2: On home page but different section
    else if (currentUrl.split('#')[0] === '/' && targetUrl === '/') {
      if (targetFragment) {
        this.scrollToSection(targetFragment);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // Case 3: On a different page entirely
    else {
      if (targetFragment) {
        this.router.navigate([targetUrl], { fragment: targetFragment });
      } else {
        this.router.navigate([targetUrl]);
      }
    }
  }

  /**
   * Scroll to section by ID on current page
   */
  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
