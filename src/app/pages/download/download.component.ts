import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class DownloadComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isDisabled(platform: string): boolean {
    return platform === 'iOS' || platform === 'Android';
  }

  downloadOptions = [
    {
      platform: 'Web',
      description: 'Accede desde cualquier navegador sin instalación',
      icon: '🌐',
      link: 'https://administracion.everymed.online',
      ctaText: 'Ir a la App'
    },
    {
      platform: 'iOS',
      description: 'Descarga desde App Store para iPhone y iPad',
      icon: '🍎',
      link: 'https://apps.apple.com/mx/app/everymed',
      ctaText: 'Próximamente'
    },
    {
      platform: 'Android',
      description: 'Descarga el APK o espera en Google Play Store',
      icon: '🤖',
      link: 'https://everymed.online/download/everymed.apk',
      ctaText: 'Próximamente'
    }
  ];

  goBack(): void {
    this.router.navigate(['/']);
  }
}
