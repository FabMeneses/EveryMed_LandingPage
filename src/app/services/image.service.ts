import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private readonly supportsWebP = signal<boolean | null>(null);

    constructor() {
        this.detectWebPSupport();
    }

    /**
     * Detect WebP support in the browser
     */
    private detectWebPSupport(): void {
        if (typeof window === 'undefined') {
            this.supportsWebP.set(false);
            return;
        }

        const webpTestImage = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';

        const img = new Image();
        img.onload = () => {
            this.supportsWebP.set(img.width === 1 && img.height === 1);
        };
        img.onerror = () => {
            this.supportsWebP.set(false);
        };
        img.src = webpTestImage;
    }

    /**
     * Get the appropriate image path with WebP fallback
     * @param basePath - Base path without extension, e.g., '/assets/images/demo/login_claro'
     * @param hasWebP - Whether WebP version exists
     */
    getImagePath(basePath: string, hasWebP: boolean = true): string {
        if (!hasWebP || this.supportsWebP() === false) {
            return `${basePath}.png`;
        }

        // If WebP support is detected or still checking, use WebP
        return basePath.includes('/images-webp/')
            ? `${basePath}.webp`
            : `${basePath.replace('/images/', '/images-webp/')}.webp`;
    }

    /**
     * Check if browser supports WebP
     */
    isWebPSupported(): boolean {
        return this.supportsWebP() ?? false;
    }
}
