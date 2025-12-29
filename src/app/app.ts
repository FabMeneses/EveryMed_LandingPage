import { Component, ChangeDetectionStrategy, inject, OnInit, AfterViewInit, OnDestroy, DestroyRef } from '@angular/core';
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
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly scrollService = inject(ScrollService);

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    // Limpiar servicios
    this.scrollService.cleanup();
  }
}
