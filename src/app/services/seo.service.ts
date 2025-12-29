import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly platformId = inject(PLATFORM_ID);
  private structuredDataLoaded = false;

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
    if (!isPlatformBrowser(this.platformId)) return;
    
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

  /**
   * Carga los datos estructurados JSON-LD de forma diferida
   * Solo se ejecuta una vez después de la carga inicial
   */
  loadStructuredData(): void {
    if (!isPlatformBrowser(this.platformId) || this.structuredDataLoaded) return;

    // Cargar después de un pequeño delay para no bloquear el render
    setTimeout(() => {
      this.injectStructuredData();
      this.structuredDataLoaded = true;
    }, 500);
  }

  private injectStructuredData(): void {
    const head = document.head;
    if (!head) return;

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'EveryMed',
        legalName: 'EveryMed - Plataforma de Gestión Médica',
        url: 'https://everymed-landing.everymed.online',
        logo: {
          '@type': 'ImageObject',
          url: 'https://everymed-landing.everymed.online/favicon.png',
          width: '192',
          height: '192'
        },
        description: 'Plataforma integral de gestión médica diseñada para médicos individuales, clínicas pequeñas y grandes centros de salud.',
        email: 'everymed@gmail.com',
        telephone: '+527714315837',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'MX',
          addressLocality: 'México'
        },
        sameAs: ['https://github.com/EveryMed'],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+527714315837',
          contactType: 'customer service',
          email: 'everymed@gmail.com',
          availableLanguage: ['Spanish', 'English'],
          areaServed: 'MX'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '2000',
          bestRating: '5',
          worstRating: '1'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'EveryMed',
        applicationCategory: 'HealthApplication',
        applicationSubCategory: 'Medical Practice Management Software',
        operatingSystem: ['Web', 'iOS', 'Android'],
        url: 'https://everymed-landing.everymed.online',
        downloadUrl: 'https://everymed-landing.everymed.online/descarga',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'MXN',
          priceRange: '$0 - $1,000+',
          availability: 'https://schema.org/InStock',
          url: 'https://everymed-landing.everymed.online/planes'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '2000',
          bestRating: '5',
          worstRating: '1'
        },
        description: 'Plataforma integral de gestión médica con historiales clínicos digitales, sistema de citas inteligente, gestión de equipo médico, seguridad HIPAA, acceso multi-dispositivo y reportes analíticos.',
        featureList: [
          'Historiales Clínicos Digitales',
          'Sistema de Citas Inteligente',
          'Gestión de Equipo Médico',
          'Seguridad de Datos HIPAA',
          'Acceso Multi-dispositivo (Web, iOS, Android)',
          'Reportes y Analíticas',
          'Recetas Digitales',
          'Telemedicina',
          'Agenda Médica',
          'Gestión de Pacientes'
        ],
        screenshot: 'https://everymed-landing.everymed.online/assets/images-webp/demo/dashboard_claro.webp',
        softwareVersion: '1.0',
        releaseNotes: 'Versión inicial con todas las funcionalidades principales',
        author: {
          '@type': 'Organization',
          name: 'EveryMed'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'EveryMed',
        url: 'https://everymed-landing.everymed.online',
        description: 'Plataforma integral de gestión médica para médicos y clínicas',
        inLanguage: 'es-MX',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://everymed-landing.everymed.online/?s={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        },
        publisher: {
          '@type': 'Organization',
          name: 'EveryMed',
          logo: {
            '@type': 'ImageObject',
            url: 'https://everymed-landing.everymed.online/favicon.png'
          }
        }
      }
    ];

    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      head.appendChild(script);
    });
  }
}
