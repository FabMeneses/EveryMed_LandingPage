import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsComponent } from './pages/legal/terms/terms.component';
import { PrivacyComponent } from './pages/legal/privacy/privacy.component';
import { CookiesComponent } from './pages/legal/cookies/cookies.component';
import { LegalNoticeComponent } from './pages/legal/legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'legal/terminos', component: TermsComponent },
  { path: 'legal/privacidad', component: PrivacyComponent },
  { path: 'legal/cookies', component: CookiesComponent },
  { path: 'legal/aviso-legal', component: LegalNoticeComponent },
  { path: '**', redirectTo: '' }
];
