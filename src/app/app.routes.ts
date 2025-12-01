import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsComponent } from './pages/legal/terms/terms.component';
import { PrivacyComponent } from './pages/legal/privacy/privacy.component';
import { CookiesComponent } from './pages/legal/cookies/cookies.component';
import { LegalNoticeComponent } from './pages/legal/legal-notice/legal-notice.component';
import { EquipoComponent } from './pages/conocenos/equipo/equipo.component';
import { DemoComponent } from './pages/demo/demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: {
    title: 'EveryMed — Plataforma Integral de Gestión Médica',
    description: 'Gestiona historiales clínicos, agenda, equipo médico y cumplimiento HIPAA desde una sola plataforma. Diseñada para médicos y clínicas de todos los tamaños.',
    ogImage: 'https://everymed-landingpage.vercel.app/assets/icons-app/everymed-icon/logo-everymed-claro.svg'
  } },
  { path: 'legal/terminos', component: TermsComponent, data: {
    title: 'Términos y Condiciones — EveryMed',
    description: 'Consulta los términos y condiciones de uso de la plataforma EveryMed.'
  } },
  { path: 'legal/privacidad', component: PrivacyComponent, data: {
    title: 'Política de Privacidad — EveryMed',
    description: 'Conoce cómo protegemos y tratamos tus datos personales en EveryMed.'
  } },
  { path: 'legal/cookies', component: CookiesComponent, data: {
    title: 'Política de Cookies — EveryMed',
    description: 'Información sobre el uso de cookies y tecnologías similares en EveryMed.'
  } },
  { path: 'legal/aviso-legal', component: LegalNoticeComponent, data: {
    title: 'Aviso Legal — EveryMed',
    description: 'Información legal y datos del titular del sitio EveryMed.'
  } },
  { path: 'conocenos/equipo', component: EquipoComponent, data: {
    title: 'Conócenos — Nuestro Equipo | EveryMed',
    description: 'Conoce al equipo detrás de EveryMed y nuestra misión en salud digital.'
  } },
  { path: 'demo', component: DemoComponent, data: {
    title: 'Demo de EveryMed — Solicita acceso',
    description: 'Explora la plataforma EveryMed: historiales clínicos digitales, agenda inteligente y más.'
  } },
  { path: '**', redirectTo: '' }
];
