import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent // Eager load home for better LCP
  },
  {
    path: 'legal/terminos',
    loadComponent: () => import('./pages/legal/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'legal/privacidad',
    loadComponent: () => import('./pages/legal/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'legal/cookies',
    loadComponent: () => import('./pages/legal/cookies/cookies.component').then(m => m.CookiesComponent)
  },
  {
    path: 'legal/aviso-legal',
    loadComponent: () => import('./pages/legal/legal-notice/legal-notice.component').then(m => m.LegalNoticeComponent)
  },
  {
    path: 'conocenos/equipo',
    loadComponent: () => import('./pages/conocenos/equipo/equipo.component').then(m => m.EquipoComponent)
  },
  {
    path: 'demo',
    loadComponent: () => import('./pages/demo/demo.component').then(m => m.DemoComponent)
  },
  {
    path: 'descarga',
    loadComponent: () => import('./pages/download/download.component').then(m => m.DownloadComponent)
  },
  { path: '**', redirectTo: '' }
];

