import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
    selector: 'app-optimized-image',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    template: `
    <picture>
      @if (hasWebP() && imageService.isWebPSupported()) {
        <source [srcset]="webpPath()" type="image/webp">
      }
      <img 
        [ngSrc]="fallbackPath()"
        [alt]="alt()"
        [width]="width() || 800"
        [height]="height() || 600"
        [priority]="priority()"
        [loading]="priority() ? 'eager' : 'lazy'"
        [class]="imgClass()"
        [attr.decoding]="priority() ? 'sync' : 'async'"
      />
    </picture>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizedImageComponent {
    // Inputs
    src = input.required<string>(); // Base path without extension
    alt = input.required<string>();
    width = input<number>();
    height = input<number>();
    hasWebP = input<boolean>(true);
    priority = input<boolean>(false); // For above-the-fold images
    imgClass = input<string>('');

    constructor(readonly imageService: ImageService) { }

    webpPath = computed(() => {
        const basePath = this.src();
        return basePath.includes('/images-webp/')
            ? `${basePath}.webp`
            : basePath.replace('/images/', '/images-webp/').concat('.webp');
    });

    fallbackPath = computed(() => {
        const basePath = this.src();
        return basePath.includes('/images-webp/')
            ? basePath.replace('/images-webp/', '/images/').replace('.webp', '.png')
            : `${basePath}.png`;
    });
}
