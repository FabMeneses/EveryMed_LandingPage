import { Injectable, signal, effect } from '@angular/core';

export interface ViewportSize {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ViewportService {
    private readonly viewportSize = signal<ViewportSize>(this.getViewportSize());

    constructor() {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', () => this.updateViewportSize());
            window.addEventListener('orientationchange', () => this.updateViewportSize());
        }
    }

    private getViewportSize(): ViewportSize {
        if (typeof window === 'undefined') {
            return {
                width: 1920,
                height: 1080,
                isMobile: false,
                isTablet: false,
                isDesktop: true
            };
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

        return {
            width,
            height,
            isMobile: width < 768,
            isTablet: width >= 768 && width < 1024,
            isDesktop: width >= 1024
        };
    }

    private updateViewportSize(): void {
        this.viewportSize.set(this.getViewportSize());
    }

    getViewport(): ViewportSize {
        return this.viewportSize();
    }

    isMobile(): boolean {
        return this.viewportSize().isMobile;
    }

    isTablet(): boolean {
        return this.viewportSize().isTablet;
    }

    isDesktop(): boolean {
        return this.viewportSize().isDesktop;
    }

    /**
     * Check if device is touch-enabled
     */
    isTouchDevice(): boolean {
        if (typeof window === 'undefined') return false;

        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            // @ts-ignore - for older browsers
            navigator.msMaxTouchPoints > 0
        );
    }

    /**
     * Check if running on iOS
     */
    isIOS(): boolean {
        if (typeof window === 'undefined') return false;

        return /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            // @ts-ignore - iOS specific check
            !window.MSStream;
    }

    /**
     * Check if running on Android
     */
    isAndroid(): boolean {
        if (typeof window === 'undefined') return false;

        return /Android/.test(navigator.userAgent);
    }

    /**
     * Check if running on Safari
     */
    isSafari(): boolean {
        if (typeof window === 'undefined') return false;

        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
}
