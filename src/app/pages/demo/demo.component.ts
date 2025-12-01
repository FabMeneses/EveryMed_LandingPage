import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
  features: string[];
}

type Theme = 'light' | 'dark';
type ViewMode = 'image' | 'video';

@Component({
  selector: 'app-demo',
  imports: [CommonModule, RouterLink, AnimateOnScrollDirective],
  templateUrl: './demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent implements OnInit, OnDestroy {
  @ViewChild('modalVideoPlayer') modalVideoPlayer?: ElementRef<HTMLVideoElement>;

  // Data
  readonly demos: DemoItem[] = [
    {
      id: 'login',
      title: 'Inicio de Sesión',
      description:
        'Pantalla de acceso seguro con autenticación mediante credenciales. Interfaz intuitiva que garantiza un inicio de sesión rápido y protegido.',
      imageLight: '/assets/images/demo/login_claro.png',
      imageDark: '/assets/images/demo/login_obscuro.png',
      features: ['Autenticación segura', 'Recordatorio de contraseña', 'Modo claro y oscuro'],
    },
    {
      id: 'dashboard',
      title: 'Panel de Control',
      description:
        'Vista general de tu clínica con métricas clave en tiempo real. Monitorea citas, pacientes e ingresos de un vistazo.',
      imageLight: '/assets/images/demo/dashboard_claro.png',
      imageDark: '/assets/images/demo/dashboard_obscuro.png',
      videoDark: '/assets/videos/demo/dashboard_obscuro.mp4',
      features: ['Métricas en tiempo real', 'Gráficos interactivos', 'Vista personalizable'],
    },
    {
      id: 'agenda',
      title: 'Gestión de Citas',
      description:
        'Sistema completo de agenda para gestionar todas tus citas médicas con una interfaz calendario intuitiva.',
      imageLight: '/assets/images/demo/agenda_claro.png',
      imageDark: '/assets/images/demo/agenda_obscuro.png',
      videoDark: '/assets/videos/demo/agenda_obscuro.mp4',
      features: ['Vista calendario y lista', 'Filtros avanzados', 'Recordatorios automáticos'],
    },
    {
      id: 'busqueda',
      title: 'Búsqueda de Expedientes',
      description:
        'Encuentra rápidamente los expedientes clínicos con nuestro sistema de búsqueda avanzada.',
      imageLight: '/assets/images/demo/busqueda_claro.png',
      imageDark: '/assets/images/demo/busqueda_obscuro.png',
      features: ['Búsqueda instantánea', 'Filtros múltiples', 'Vista previa de resultados'],
    },
    {
      id: 'equipo',
      title: 'Gestión de Equipo',
      description:
        'Administra todo tu equipo médico desde un solo lugar. Gestiona roles, permisos y horarios.',
      imageLight: '/assets/images/demo/equipo_claro.png',
      imageDark: '/assets/images/demo/equipo_obscuro.png',
      features: ['Gestión de roles', 'Asignación de permisos', 'Control de acceso'],
    },
    {
      id: 'clinica',
      title: 'Configuración de Clínica',
      description:
        'Personaliza la configuración general de tu clínica. Ajusta datos, contacto y horarios.',
      imageLight: '/assets/images/demo/clinica_claro.png',
      imageDark: '/assets/images/demo/clinica_obscuro.png',
      features: ['Datos del establecimiento', 'Configuración general', 'Personalización de marca'],
    },
    {
      id: 'ajustes',
      title: 'Ajustes del Sistema',
      description:
        'Configura las preferencias del sistema. Personaliza notificaciones, temas e idioma.',
      imageLight: '/assets/images/demo/ajustes_claro.png',
      imageDark: '/assets/images/demo/ajustes_obscuro.png',
      features: ['Preferencias de usuario', 'Configuración avanzada', 'Temas personalizables'],
    },
    {
      id: 'notificaciones',
      title: 'Centro de Notificaciones',
      description:
        'Mantente informado con alertas sobre citas, recordatorios y actualizaciones del sistema.',
      imageLight: '/assets/images/demo/notificaciones_claro.png',
      imageDark: '/assets/images/demo/notificaciones_obscuro.png',
      videoDark: '/assets/videos/demo/notificaciones_obscuro.mp4',
      features: ['Notificaciones en tiempo real', 'Historial completo', 'Configuración de alertas'],
    },
    {
      id: 'recordatorios',
      title: 'Sistema de Recordatorios',
      description:
        'Crea y gestiona recordatorios personalizados para citas, seguimientos y tareas.',
      imageLight: '/assets/images/demo/recordatorios_claro.png',
      imageDark: '/assets/images/demo/recordatorios_obscuro.png',
      features: ['Recordatorios personalizados', 'Notificaciones automáticas', 'Gestión de tareas'],
    },
  ];

  // State
  readonly demoThemes = signal<Record<string, Theme>>({});
  readonly demoViewMode = signal<Record<string, ViewMode>>({});

  // Modal State
  readonly activeDemoId = signal<string | null>(null);
  readonly isVideoPlaying = signal<Record<string, boolean>>({});
  readonly videoProgress = signal<Record<string, number>>({});

  // Computed
  readonly activeDemo = computed(() => {
    const id = this.activeDemoId();
    return id ? this.demos.find((d) => d.id === id) ?? null : null;
  });

  readonly activeDemoIndex = computed(() => {
    const id = this.activeDemoId();
    return id ? this.demos.findIndex((d) => d.id === id) : -1;
  });

  readonly canNavigatePrev = computed(() => this.activeDemoIndex() > 0);
  readonly canNavigateNext = computed(() => this.activeDemoIndex() < this.demos.length - 1);

  // Lifecycle
  private keydownHandler = this.handleKeyDown.bind(this);

  ngOnInit(): void {
    document.addEventListener('keydown', this.keydownHandler);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keydownHandler);
    document.body.style.overflow = ''; // Ensure scroll is restored
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.activeDemoId()) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.navigatePrev();
        break;
      case 'ArrowRight':
        this.navigateNext();
        break;
    }
  }

  // Actions
  openModal(demoId: string, event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();

    this.activeDemoId.set(demoId);
    document.body.style.overflow = 'hidden';
  }

  closeModal(event?: Event): void {
    if (event) {
      // Prevent closing if clicking on modal content, only close on backdrop
      const target = event.target as HTMLElement;
      if (!target.classList.contains('modal-backdrop')) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
    }

    this.pauseAllVideos();
    this.activeDemoId.set(null);
    document.body.style.overflow = '';
  }

  navigatePrev(): void {
    const currentIndex = this.activeDemoIndex();
    if (currentIndex > 0) {
      this.pauseAllVideos();
      this.activeDemoId.set(this.demos[currentIndex - 1].id);
    }
  }

  navigateNext(): void {
    const currentIndex = this.activeDemoIndex();
    if (currentIndex < this.demos.length - 1) {
      this.pauseAllVideos();
      this.activeDemoId.set(this.demos[currentIndex + 1].id);
    }
  }

  navigateToDemo(demoId: string): void {
    this.pauseAllVideos();
    this.activeDemoId.set(demoId);
  }

  // Preferences (Theme & View Mode)
  getTheme(demoId: string): Theme {
    return this.demoThemes()[demoId] ?? 'light';
  }

  toggleTheme(demoId: string): void {
    const current = this.getTheme(demoId);
    this.demoThemes.update((themes) => ({
      ...themes,
      [demoId]: current === 'light' ? 'dark' : 'light',
    }));
  }

  getViewMode(demoId: string): ViewMode {
    return this.demoViewMode()[demoId] ?? 'image';
  }

  toggleViewMode(demoId: string): void {
    const current = this.getViewMode(demoId);
    const newMode = current === 'image' ? 'video' : 'image';

    if (newMode === 'image') {
      this.pauseAllVideos();
    }

    this.demoViewMode.update((modes) => ({
      ...modes,
      [demoId]: newMode,
    }));
  }

  // Helpers
  getImage(demo: DemoItem): string {
    return this.getTheme(demo.id) === 'light' ? demo.imageLight : demo.imageDark;
  }

  getVideo(demo: DemoItem): string | null {
    const theme = this.getTheme(demo.id);
    if (theme === 'dark' && demo.videoDark) return demo.videoDark;
    if (theme === 'light' && demo.videoLight) return demo.videoLight;
    return demo.videoDark ?? demo.videoLight ?? null;
  }

  hasVideo(demo: DemoItem): boolean {
    return !!(demo.videoDark || demo.videoLight);
  }

  isReversed(index: number): boolean {
    return index % 2 === 1;
  }

  // Template helper methods
  getImageOrder(index: number): number {
    return index % 2 === 0 ? 2 : 1;
  }

  getContentOrder(index: number): number {
    return index % 2 === 0 ? 1 : 2;
  }

  openFullscreen(demoId: string): void {
    this.openModal(demoId);
  }

  closeFullscreen(event?: Event): void {
    this.closeModal(event);
  }

  getCurrentFullscreenDemo(): DemoItem | null {
    return this.activeDemo();
  }

  getViewModeForDemo(demoId: string): ViewMode {
    return this.getViewMode(demoId);
  }

  getImageForDemo(demo: DemoItem): string {
    return this.getImage(demo);
  }

  getVideoForDemo(demo: DemoItem): string | null {
    return this.getVideo(demo);
  }

  getThemeForDemo(demoId: string): Theme {
    return this.getTheme(demoId);
  }

  toggleVideoPlay(demoId: string, videoEl: HTMLVideoElement): void {
    this.toggleVideo(demoId, videoEl);
  }

  playingVideos(): Record<string, boolean> {
    return this.isVideoPlaying();
  }

  onFullscreenLoaded(demoId: string, videoEl: HTMLVideoElement): void {
    // Optional: handle video loaded metadata
    this.videoProgress.update((state) => ({ ...state, [demoId]: 0 }));
  }

  // Video Controls
  isPlaying(demoId: string): boolean {
    return this.isVideoPlaying()[demoId] ?? false;
  }

  getProgress(demoId: string): number {
    return this.videoProgress()[demoId] ?? 0;
  }

  toggleVideo(demoId: string, videoEl: HTMLVideoElement): void {
    if (videoEl.paused) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }

  onVideoPlay(demoId: string): void {
    this.isVideoPlaying.update((state) => ({ ...state, [demoId]: true }));
  }

  onVideoPause(demoId: string): void {
    this.isVideoPlaying.update((state) => ({ ...state, [demoId]: false }));
  }

  onVideoTimeUpdate(demoId: string, videoEl: HTMLVideoElement): void {
    const progress = (videoEl.currentTime / videoEl.duration) * 100 || 0;
    this.videoProgress.update((state) => ({ ...state, [demoId]: progress }));
  }

  onVideoEnded(demoId: string): void {
    this.isVideoPlaying.update((state) => ({ ...state, [demoId]: false }));
    this.videoProgress.update((state) => ({ ...state, [demoId]: 0 }));
  }

  private pauseAllVideos(): void {
    document.querySelectorAll('video').forEach((v) => v.pause());
    this.isVideoPlaying.set({});
    this.videoProgress.set({});
  }
}
