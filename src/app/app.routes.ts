import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsComponent } from './pages/legal/terms/terms.component';
import { PrivacyComponent } from './pages/legal/privacy/privacy.component';
import { CookiesComponent } from './pages/legal/cookies/cookies.component';
import { LegalNoticeComponent } from './pages/legal/legal-notice/legal-notice.component';
import { EquipoComponent } from './pages/conocenos/equipo/equipo.component';
import { DemoComponent } from './pages/demo/demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'legal/terminos', component: TermsComponent },
  { path: 'legal/privacidad', component: PrivacyComponent },
  { path: 'legal/cookies', component: CookiesComponent },
  { path: 'legal/aviso-legal', component: LegalNoticeComponent },
  { path: 'conocenos/equipo', component: EquipoComponent },
  { path: 'demo', component: DemoComponent },
  { path: '**', redirectTo: '' }
];
