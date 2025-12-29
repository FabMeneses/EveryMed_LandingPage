import { Injectable, inject, DestroyRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, delay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private initialized = false;
  private pendingPageview = false;

  /**
   * Inicializa Vercel Analytics y Speed Insights de forma diferida
   * Solo se carga después de que la app está lista
   */
  initialize(): void {
    if (this.initialized || typeof window === 'undefined') return;

    // Delay para no bloquear el render inicial
    setTimeout(() => {
      this.loadAnalytics();
      this.loadSpeedInsights();
      this.initialized = true;

      // Registrar pageview pendiente si existe
      if (this.pendingPageview) {
        this.trackPageview();
        this.pendingPageview = false;
      }

      // Suscribirse a cambios de ruta para SPA
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          delay(100), // Pequeño delay para asegurar que el DOM está listo
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.trackPageview();
        });
    }, 100);
  }

  private loadAnalytics(): void {
    if (typeof window === 'undefined' || window.va) return;

    import('@vercel/analytics').then((analytics) => {
      // @vercel/analytics v1.x exporta inject como named export
      if (analytics.inject && typeof analytics.inject === 'function') {
        analytics.inject();
      }
    }).catch(() => {
      // Silently fail si no está disponible
    });
  }

  private loadSpeedInsights(): void {
    if (typeof window === 'undefined') return;

    import('@vercel/speed-insights').then((speedInsights) => {
      // @vercel/speed-insights v1.x exporta injectSpeedInsights (no inject)
      if (speedInsights.injectSpeedInsights && typeof speedInsights.injectSpeedInsights === 'function') {
        speedInsights.injectSpeedInsights();
      }
    }).catch(() => {
      // Silently fail si no está disponible
    });
  }

  trackPageview(): void {
    if (!this.initialized) {
      this.pendingPageview = true;
      return;
    }

    if (typeof window !== 'undefined' && window.va) {
      // window.va es definido por @vercel/analytics con la firma correcta
      window.va('pageview');
    }
  }
}

