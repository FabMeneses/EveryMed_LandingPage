import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CTAComponent {
  private router = inject(Router);

  readonly benefits: readonly string[] = [
    'Acceso anticipado disponible próximamente',
    'Implementación y capacitación incluidas',
    'Soporte técnico especializado',
    'Migración de datos sin costo'
  ] as const;

  goToDownload(): void {
    this.router.navigate(['/descarga']);
  }
}

