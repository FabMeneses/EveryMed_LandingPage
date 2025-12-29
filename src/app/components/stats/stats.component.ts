import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

interface Stat {
  iconType: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
  readonly stats: Stat[] = [
    { iconType: 'hospital', value: '9+', label: 'Módulos principales' },
    { iconType: 'doctor', value: '∞', label: 'Escalabilidad' },
    { iconType: 'calendar', value: 'Multi', label: 'Dispositivos' },
    { iconType: 'document', value: '✓', label: 'Adaptable a todo tipo de especialidades' },
  ];
}
