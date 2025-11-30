import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
  stats = [
    { iconType: 'hospital', value: '150+', label: 'Clínicas activas' },
    { iconType: 'doctor', value: '2,000+', label: 'Médicos profesionales' },
    { iconType: 'calendar', value: '50K+', label: 'Citas mensuales' },
    { iconType: 'document', value: '100K+', label: 'Historiales digitales' }
  ];
}

