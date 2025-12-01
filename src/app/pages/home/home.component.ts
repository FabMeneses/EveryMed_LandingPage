import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { PlansComponent } from '../../components/plans/plans.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { FAQComponent } from '../../components/faq/faq.component';
import { CTAComponent } from '../../components/cta/cta.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    StatsComponent,
    FeaturesComponent,
    PlansComponent,
    TestimonialsComponent,
    FAQComponent,
    CTAComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class HomeComponent {}
