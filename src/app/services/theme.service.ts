import { Injectable, signal, computed, effect } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'landing-page-theme';
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersDark = this.isBrowser
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
  private readonly themeSignal = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Aplicar tema inicial inmediatamente
    if (this.isBrowser && typeof document !== 'undefined') {
      const initialTheme = this.themeSignal();
      this.applyTheme(initialTheme);
    }

    // Efecto para aplicar tema cuando cambie
    effect(() => {
      if (this.isBrowser) {
        this.applyTheme(this.themeSignal());
      }
    });

    // Escuchar cambios en la preferencia del sistema
    if (this.isBrowser && this.prefersDark) {
      const handlePreferenceChange = (event: MediaQueryListEvent) => {
        // Solo actualizar si no hay tema guardado
        const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
        if (!savedTheme) {
          this.themeSignal.set(event.matches ? 'dark' : 'light');
        }
      };

      this.prefersDark.addEventListener('change', handlePreferenceChange);
    }
  }

  readonly theme = this.themeSignal.asReadonly();
  readonly isDarkMode = computed(() => this.theme() === 'dark');

  toggleTheme(): void {
    const newTheme: Theme = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }

    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Verificar preferencia del sistema
    if (this.prefersDark) {
      return this.prefersDark.matches ? 'dark' : 'light';
    }

    return 'light';
  }

  // Aplica la clase 'dark' en <html> y <body> para que Tailwind y los estilos CSS funcionen
  private applyTheme(theme: 'light' | 'dark'): void {
    if (!this.isBrowser || typeof document === 'undefined') {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    
    // Aplicar clase dark a html (para Tailwind)
    if (theme === 'dark') {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }

    // También agregar atributo data-theme para compatibilidad
    html.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);
  }
}


