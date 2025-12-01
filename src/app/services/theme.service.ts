import { DestroyRef, Injectable, signal, computed, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// Servicio para gestionar el tema de la app (solo detección automática del sistema)
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersDark = this.isBrowser
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
  private readonly systemTheme = signal<'light' | 'dark'>(this.getSystemTheme());

  // Estado reactivo del tema actual (basado únicamente en el sistema)
  readonly currentTheme = computed(() => this.systemTheme());
  readonly isDarkMode = computed(() => this.currentTheme() === 'dark');

  constructor() {
    effect(() => {
      if (!this.isBrowser) {
        return;
      }
      this.applyTheme(this.currentTheme());
    });

    if (!this.isBrowser) {
      return;
    }

    if (this.prefersDark) {
      const handlePreferenceChange = (event: MediaQueryListEvent) => {
        this.systemTheme.set(event.matches ? 'dark' : 'light');
      };

      this.prefersDark.addEventListener('change', handlePreferenceChange);
      this.destroyRef.onDestroy(() => {
        this.prefersDark?.removeEventListener('change', handlePreferenceChange);
      });
    }
  }

  // Aplica la clase 'dark' al <html>
  private applyTheme(theme: 'light' | 'dark') {
    if (!this.isBrowser) {
      return;
    }

    const root = this.document.documentElement;
    const body = this.document.body;

    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.setAttribute('data-theme', theme);

    body.classList.toggle('dark', theme === 'dark');
    body.classList.toggle('light', theme === 'light');
    body.setAttribute('data-theme', theme);

    // Ajusta meta theme-color para navegadores móviles
    const themeColorMeta = this.document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#1A1A26' : '#F2F2F2');
    }
  }

  // Obtiene el tema del sistema
  private getSystemTheme(): 'light' | 'dark' {
    if (!this.prefersDark) {
      return 'light';
    }
    return this.prefersDark.matches ? 'dark' : 'light';
  }
}

