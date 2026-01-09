import { Component, ChangeDetectionStrategy, inject, OnInit, AfterViewInit, OnDestroy, DestroyRef, ElementRef, ViewChild, afterNextRender, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from './services/theme.service';
import { SeoService } from './services/seo.service';
import { AnalyticsService } from './services/analytics.service';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BottomNavComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.app-loaded]': 'isAppReady()'
  }
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appContainer', { static: false }) appContainer?: ElementRef<HTMLElement>;
  
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly scrollService = inject(ScrollService);
  private readonly elementRef = inject(ElementRef);
  
  // Signal para controlar cuando la app está lista
  protected readonly isAppReady = signal<boolean>(false);
  
  // Signal para detectar si estamos en la página de equipo
  protected readonly isEquipoPage = signal<boolean>(false);

  constructor() {
    // Usar afterNextRender para asegurar que el DOM esté completamente renderizado
    afterNextRender(() => {
      this.markAppAsReady();
    });
  }

  ngOnInit(): void {
    // Detectar ruta inicial
    this.isEquipoPage.set(this.router.url === '/conocenos/equipo');
    
    // Cargar datos estructurados de forma diferida
    this.seo.loadStructuredData();

    // Inicializar Analytics de forma diferida
    this.analytics.initialize();

    // Escuchar eventos de navegación para SEO y Analytics
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        // Detectar si estamos en la página de equipo
        this.isEquipoPage.set(url === '/conocenos/equipo');

        // Reiniciar scroll si es una ruta de legal, conocenos o demo
        if (url.startsWith('/legal/') || url.startsWith('/conocenos/') || url.startsWith('/demo')) {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }

        // Actualizar canonical según la ruta actual
        this.seo.setCanonicalFromPath(url);

        // Extraer datos SEO de la ruta más profunda y aplicarlos
        let current = this.route.firstChild;
        while (current?.firstChild) current = current.firstChild;
        const data = current?.snapshot.data as { title?: string; description?: string; ogImage?: string; robots?: string } | undefined;
        this.seo.applyRouteSeo(data || {});
      });
  }

  ngAfterViewInit(): void {
    // Inicializar scroll suave después de que la vista está lista
    this.scrollService.initialize();
    
    // Marcar app como lista después de un pequeño delay para asegurar que los estilos se cargaron
    if (typeof window !== 'undefined') {
      // Usar requestAnimationFrame para asegurar que el render esté completo
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.markAppAsReady();
        });
      });
    }
  }

  ngOnDestroy(): void {
    // Limpiar servicios
    this.scrollService.cleanup();
  }

  private markAppAsReady(): void {
    if (typeof window === 'undefined' || this.isAppReady()) return;

    // Esperar a que los estilos estén cargados
    if (document.readyState === 'complete') {
      this.finalizeAppReady();
    } else {
      window.addEventListener('load', () => {
        this.finalizeAppReady();
      }, { once: true });
    }

    // Fallback: marcar como listo después de un tiempo máximo
    setTimeout(() => {
      this.finalizeAppReady();
    }, 1000);
  }

  private finalizeAppReady(): void {
    if (this.isAppReady()) return;

    // Marcar como listo
    this.isAppReady.set(true);

    // Remover clase de loading del HTML
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('loading');
      
      // Agregar clase al elemento raíz
      const rootElement = this.elementRef.nativeElement as HTMLElement;
      if (rootElement) {
        rootElement.classList.add('app-loaded');
      }
    }
  }
}
