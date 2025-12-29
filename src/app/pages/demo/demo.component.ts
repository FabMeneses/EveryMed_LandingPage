import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

interface DemoItem {
  id: string;
  title: string;
  description: string;
  imageLight: string;
  imageDark: string;
  videoDark?: string;
  videoLight?: string;
  secondaryImageLight?: string;
  secondaryImageDark?: string;
  features: string[];
}

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-demo',
  imports: [CommonModule, RouterLink, AnimateOnScrollDirective],
  templateUrl: './demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent implements OnInit, OnDestroy {
  // Data
  readonly demos: DemoItem[] = [
    {
      id: 'login',
      title: 'Inicio de Sesión',
      description:
        'Pantalla de acceso seguro con autenticación mediante credenciales. Interfaz intuitiva que garantiza un inicio de sesión rápido y protegido.',
      imageLight: '/assets/images-webp/demo/login_claro.webp',
      imageDark: '/assets/images-webp/demo/login_obscuro.webp',
      features: ['Autenticación segura', 'Recordatorio de contraseña', 'Modo claro y oscuro'],
    },
    {
      id: 'dashboard',
      title: 'Panel de Control',
      description:
        'Vista general de tu clínica con métricas clave en tiempo real. Monitorea citas, pacientes e ingresos de un vistazo.',
      imageLight: '/assets/images-webp/demo/dashboard_claro.webp',
      imageDark: '/assets/images-webp/demo/dashboard_obscuro.webp',
      videoDark: '/assets/videos/demo/dashboard_obscuro.mp4',
      features: ['Métricas en tiempo real', 'Gráficos interactivos', 'Vista personalizable'],
    },
    {
      id: 'agenda',
      title: 'Gestión de Citas',
      description:
        'Sistema completo de agenda para gestionar todas tus citas médicas con una interfaz calendario intuitiva.',
      imageLight: '/assets/images-webp/demo/agenda_claro.webp',
      imageDark: '/assets/images-webp/demo/agenda_obscuro.webp',
      videoDark: '/assets/videos/demo/agenda_obscuro.mp4',
      features: ['Vista calendario y lista', 'Filtros avanzados', 'Recordatorios automáticos'],
    },
    {
      id: 'busqueda',
      title: 'Búsqueda de Expedientes',
      description:
        'Encuentra rápidamente los expedientes clínicos con nuestro sistema de búsqueda avanzada.',
      imageLight: '/assets/images-webp/demo/busqueda_claro.webp',
      imageDark: '/assets/images-webp/demo/busqueda_obscuro.webp',
      features: ['Búsqueda instantánea', 'Filtros múltiples', 'Vista previa de resultados'],
    },
    {
      id: 'equipo',
      title: 'Gestión de Equipo',
      description:
        'Administra todo tu equipo médico desde un solo lugar. Gestiona roles, permisos y horarios.',
      imageLight: '/assets/images-webp/demo/equipo_claro.webp',
      imageDark: '/assets/images-webp/demo/equipo_obscuro.webp',
      features: ['Gestión de roles', 'Asignación de permisos', 'Control de acceso'],
    },
    {
      id: 'clinica',
      title: 'Configuración de Clínica',
      description:
        'Personaliza la configuración general de tu clínica. Ajusta datos, contacto y horarios.',
      imageLight: '/assets/images-webp/demo/clinica_claro.webp',
      imageDark: '/assets/images-webp/demo/clinica_obscuro.webp',
      features: ['Datos del establecimiento', 'Configuración general', 'Personalización de marca'],
    },
    {
      id: 'ajustes',
      title: 'Ajustes del Sistema',
      description:
        'Configura las preferencias del sistema. Personaliza notificaciones, temas e idioma.',
      imageLight: '/assets/images-webp/demo/ajustes_claro.webp',
      imageDark: '/assets/images-webp/demo/ajustes_obscuro.webp',
      features: ['Preferencias de usuario', 'Configuración avanzada', 'Temas personalizables'],
    },
    {
      id: 'notificaciones',
      title: 'Centro de Notificaciones',
      description:
        'Mantente informado con alertas sobre citas, recordatorios y actualizaciones del sistema.',
      imageLight: '/assets/images-webp/demo/notificaciones_claro.webp',
      imageDark: '/assets/images-webp/demo/notificaciones_obscuro.webp',
      videoDark: '/assets/videos/demo/notificaciones_obscuro.mp4',
      features: ['Notificaciones en tiempo real', 'Historial completo', 'Configuración de alertas'],
    },
    {
      id: 'recordatorios',
      title: 'Sistema de Recordatorios',
      description:
        'Crea y gestiona recordatorios personalizados para citas, seguimientos y tareas.',
      imageLight: '/assets/images-webp/demo/recordatorios_claro.webp',
      imageDark: '/assets/images-webp/demo/recordatorios_obscuro.webp',
      features: ['Recordatorios personalizados', 'Notificaciones automáticas', 'Gestión de tareas'],
    },
    {
      id: 'movil-section',
      title: 'También se puede usar en Móvil',
      description:
        'Accede y gestiona tu clínica desde cualquier dispositivo móvil o tablet. Disfruta de la misma funcionalidad completa con una interfaz optimizada para pantallas más pequeñas.',
      imageLight: '/assets/images-webp/demo/mobile/dashboard_movil_claro.webp',
      imageDark: '/assets/images-webp/demo/mobile/dashboard_movil_obscuro.webp',
      secondaryImageLight: '/assets/images-webp/demo/mobile/agenda_movil_claro.webp',
      secondaryImageDark: '/assets/images-webp/demo/mobile/agenda_movil_obscuro.webp',
      features: [
        'Interfaz optimizada para móvil',
        'Acceso en cualquier dispositivo',
        'Gestión completa desde tablet',
      ],
    },
  ];

  // State
  readonly demoThemes = signal<Record<string, Theme>>({});
  readonly showVideo = signal<Record<string, boolean>>({});

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  // Preferences (Theme only)
  getTheme(demoId: string): Theme {
    return this.demoThemes()[demoId] ?? 'light';
  }

  toggleTheme(demoId: string): void {
    const current = this.getTheme(demoId);
    this.demoThemes.update((themes) => ({
      ...themes,
      [demoId]: current === 'light' ? 'dark' : 'light',
    }));
    // Si el video está visible pero no hay video para el nuevo tema, ocultar video
    const demo = this.demos.find((d) => d.id === demoId);
    if (demo && this.isVideoVisible(demoId) && !this.hasVideo(demo)) {
      this.showVideo.update((videos) => ({
        ...videos,
        [demoId]: false,
      }));
    }
  }

  // Helpers
  getImage(demo: DemoItem): string {
    return this.getTheme(demo.id) === 'light' ? demo.imageLight : demo.imageDark;
  }

  getVideo(demo: DemoItem): string | null {
    const theme = this.getTheme(demo.id);
    if (theme === 'dark' && demo.videoDark) {
      return demo.videoDark;
    }
    if (theme === 'light' && demo.videoLight) {
      return demo.videoLight;
    }
    return null;
  }

  hasVideo(demo: DemoItem): boolean {
    return !!this.getVideo(demo);
  }

  isVideoVisible(demoId: string): boolean {
    return this.showVideo()[demoId] ?? false;
  }

  toggleVideo(demoId: string): void {
    this.showVideo.update((videos) => ({
      ...videos,
      [demoId]: !(videos[demoId] ?? false),
    }));
  }

  getImageOrder(index: number): number {
    return index % 2 === 0 ? 2 : 1;
  }

  getContentOrder(index: number): number {
    return index % 2 === 0 ? 1 : 2;
  }

  /**
   * Get button classes based on local theme for this demo item
   * Returns 'light' or 'dark' class for styling button
   */
  getButtonThemeClass(demoId: string): string {
    return `demo-theme-${this.getTheme(demoId)}`;
  }

  /**
   * Get demos that have videos available
   */
  getDemosWithVideos(): DemoItem[] {
    return this.demos.filter((demo) => demo.videoDark || demo.videoLight);
  }

  /**
   * Check if a demo is a mobile demo
   */
  isMobileDemo(demoId: string): boolean {
    return demoId.includes('movil');
  }

  /**
   * Get secondary image for mobile section
   */
  getSecondaryImage(demo: DemoItem): string | undefined {
    return this.getTheme(demo.id) === 'light' ? demo.secondaryImageLight : demo.secondaryImageDark;
  }

  /**
   * Check if demo has secondary image
   */
  hasSecondaryImage(demo: DemoItem): boolean {
    return !!this.getSecondaryImage(demo);
  }
}
