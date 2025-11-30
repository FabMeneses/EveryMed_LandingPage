import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CTAComponent {
  benefits = [
    'Acceso anticipado disponible próximamente',
    'Implementación y capacitación incluidas',
    'Soporte técnico especializado',
    'Migración de datos sin costo'
  ];
}

