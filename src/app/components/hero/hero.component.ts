import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AnimateOnScrollDirective, RouterLink, NgOptimizedImage],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  getIcons(): Array<'male' | 'female'> {
    return ['male', 'female', 'male', 'female'];
  }
}

