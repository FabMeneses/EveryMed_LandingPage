import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  setCanonicalFromPath(path: string): void {
    const origin = window.location.origin;
    const href = `${origin}${path || '/'}`;
    this.upsertCanonical(href);
  }

  applyRouteSeo(data: { title?: string; description?: string; ogImage?: string; robots?: string } = {}): void {
    const siteName = 'EveryMed';
    const title = data.title || 'EveryMed — Plataforma Integral de Gestión Médica';
    const description = data.description || 'Plataforma integral de gestión médica para médicos y clínicas. Historiales clínicos digitales, agenda, equipo y cumplimiento HIPAA.';
    const ogImage = data.ogImage || 'https://everymed-landingpage.vercel.app/assets/icons-app/everymed-icon/logo-everymed-claro.svg';
    const robots = data.robots || 'index, follow';

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: robots });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });
    this.meta.updateTag({ property: 'og:image', content: ogImage });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });
  }

  private upsertCanonical(href: string): void {
    const head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;

    let link: HTMLLinkElement | null = head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
