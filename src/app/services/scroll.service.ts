import { Injectable, DestroyRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private clickHandler?: (event: MouseEvent) => void;

  /**
   * Inicializa el manejo de scroll suave con offset para enlaces hash
   * Se ejecuta después de que la vista está lista
   */
  initialize(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Delay para no interferir con el render inicial
    setTimeout(() => {
      this.setupHashScroll();
      this.handleInitialHash();
    }, 200);
  }

  private setupHashScroll(): void {
    const getHeaderHeight = (): number => {
      return window.innerWidth >= 640 ? 64 : 56;
    };

    const scrollToSection = (sectionId: string): void => {
      const targetElement = document.getElementById(sectionId);
      if (!targetElement) return;

      if (sectionId === 'inicio') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const headerHeight = getHeaderHeight();
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    };

    this.clickHandler = (event: MouseEvent) => {
      // Ignorar clics si hay un modal abierto
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) return;

      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link && link.hash && link.hash !== '#') {
        event.preventDefault();
        const targetId = link.hash.substring(1);
        
        setTimeout(() => {
          scrollToSection(targetId);
        }, 10);
      }
    };

    document.addEventListener('click', this.clickHandler, true);
  }

  private handleInitialHash(): void {
    if (!window.location.hash) return;

    // Usar requestAnimationFrame para mejor rendimiento
    requestAnimationFrame(() => {
      setTimeout(() => {
        const hash = window.location.hash.substring(1);
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          const headerHeight = window.innerWidth >= 640 ? 64 : 56;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }, 100);
    });
  }

  cleanup(): void {
    if (this.clickHandler) {
      document.removeEventListener('click', this.clickHandler, true);
      this.clickHandler = undefined;
    }
  }
}

