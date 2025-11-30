import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  getIcons(): Array<'male' | 'female'> {
    return ['male', 'female', 'male', 'female'];
  }
}

