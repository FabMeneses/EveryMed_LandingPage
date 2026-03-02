import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Eager load home for better LCP
    data: {
      title: 'EveryMed - Plataforma Integral de Gestión Médica | Software Clínico',
      description: 'Plataforma integral de gestión médica diseñada para médicos individuales, clínicas pequeñas y grandes centros de salud. Gestiona historiales clínicos, citas, recetas y más desde un solo lugar.',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }
  },
  {
    path: 'legal/terminos',
    loadComponent: () => import('./pages/legal/terms/terms.component').then(m => m.TermsComponent),
    data: {
      title: 'Términos y Condiciones - EveryMed',
      description: 'Lee los términos y condiciones de uso de EveryMed, plataforma integral de gestión médica.',
      robots: 'noindex, follow'
    }
  },
  {
    path: 'legal/privacidad',
    loadComponent: () => import('./pages/legal/privacy/privacy.component').then(m => m.PrivacyComponent),
    data: {
      title: 'Política de Privacidad - EveryMed',
      description: 'Conoce cómo EveryMed gestiona y protege tus datos personales conforme a la normativa vigente.',
      robots: 'noindex, follow'
    }
  },
  {
    path: 'legal/cookies',
    loadComponent: () => import('./pages/legal/cookies/cookies.component').then(m => m.CookiesComponent),
    data: {
      title: 'Política de Cookies - EveryMed',
      description: 'Información sobre el uso de cookies en EveryMed.',
      robots: 'noindex, follow'
    }
  },
  {
    path: 'legal/aviso-legal',
    loadComponent: () => import('./pages/legal/legal-notice/legal-notice.component').then(m => m.LegalNoticeComponent),
    data: {
      title: 'Aviso Legal - EveryMed',
      description: 'Aviso legal de EveryMed, plataforma integral de gestión médica.',
      robots: 'noindex, follow'
    }
  },
  {
    path: 'conocenos/equipo',
    loadComponent: () => import('./pages/conocenos/equipo/equipo.component').then(m => m.EquipoComponent),
    data: {
      title: 'Nuestro Equipo - EveryMed | Conoce a FALCodeX',
      description: 'Conoce al equipo de FALCodeX, los desarrolladores detrás de EveryMed. Especialistas en software médico y soluciones tecnológicas para el sector salud.',
      robots: 'index, follow'
    }
  },
  {
    path: 'demo',
    loadComponent: () => import('./pages/demo/demo.component').then(m => m.DemoComponent),
    data: {
      title: 'Demo de EveryMed - Ve la plataforma en acción',
      description: 'Explora las funcionalidades de EveryMed: panel de control, gestión de citas, historiales clínicos, recetas digitales y más. Demo interactiva disponible.',
      robots: 'index, follow'
    }
  },
  {
    path: 'descarga',
    loadComponent: () => import('./pages/download/download.component').then(m => m.DownloadComponent),
    data: {
      title: 'Descarga EveryMed - Disponible en Web, iOS y Android',
      description: 'Descarga EveryMed en tu dispositivo favorito. Disponible como aplicación web, iOS y Android. Gestiona tu clínica desde cualquier lugar.',
      robots: 'index, follow'
    }
  },
  { path: '**', redirectTo: '' }
];

