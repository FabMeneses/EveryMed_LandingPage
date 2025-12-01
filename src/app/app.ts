import { Component, ChangeDetectionStrategy, inject, OnInit, DestroyRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from './services/theme.service';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BottomNavComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  // Inicializa el servicio de tema
  private readonly themeService = inject(ThemeService);
  private clickHandler?: (event: MouseEvent) => void;

  ngOnInit(): void {
    // Escuchar eventos de navegación y reiniciar scroll para rutas específicas
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        // Reiniciar scroll si es una ruta de legal, conocenos o demo (no es la landing)
        if (url.startsWith('/legal/') || url.startsWith('/conocenos/') || url.startsWith('/demo')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  ngAfterViewInit(): void {
    // Función helper para calcular la altura del header
    const getHeaderHeight = (): number => {
      // h-14 = 3.5rem = 56px en móvil, h-16 = 4rem = 64px en desktop
      return window.innerWidth >= 640 ? 64 : 56;
    };

    // Función helper para hacer scroll a una sección con offset
    const scrollToSection = (sectionId: string): void => {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        // Para "inicio", ir completamente al top ya que el hero ya tiene padding
        if (sectionId === 'inicio') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }

        // Para otras secciones, aplicar offset del header
        const headerHeight = getHeaderHeight();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: Math.max(0, offsetPosition), // Asegurar que no sea negativo
          behavior: 'smooth'
        });
      }
    };

    // Interceptar clics en enlaces con hash para hacer scroll con offset del header
    this.clickHandler = (event: MouseEvent) => {
      // Ignorar clics si hay un modal abierto
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        return;
      }

      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link && link.hash && link.hash !== '#') {
        event.preventDefault();
        const targetId = link.hash.substring(1);

        // Pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
          scrollToSection(targetId);
        }, 10);
      }
    };

    document.addEventListener('click', this.clickHandler, true);

    // Manejar hash en la URL al cargar la página
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash.substring(1);
        scrollToSection(hash);
      }, 100);
    }
  }

  ngOnDestroy(): void {
    // Limpiar el event listener
    if (this.clickHandler) {
      document.removeEventListener('click', this.clickHandler, true);
    }
  }
}
