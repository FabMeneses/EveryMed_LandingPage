import { Directive, ElementRef, OnInit, OnDestroy, output } from '@angular/core';

@Directive({
    selector: '[appTouchEvents]',
    standalone: true
})
export class TouchEventsDirective implements OnInit, OnDestroy {
    swipeLeft = output<void>();
    swipeRight = output<void>();
    tap = output<void>();
    longPress = output<void>();

    private touchStartX = 0;
    private touchStartY = 0;
    private touchStartTime = 0;
    private longPressTimer: any;

    private readonly SWIPE_THRESHOLD = 50;
    private readonly LONG_PRESS_DURATION = 500;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        const element = this.el.nativeElement;

        element.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
        element.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });
        element.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    }

    ngOnDestroy(): void {
        const element = this.el.nativeElement;

        element.removeEventListener('touchstart', this.onTouchStart.bind(this));
        element.removeEventListener('touchend', this.onTouchEnd.bind(this));
        element.removeEventListener('touchmove', this.onTouchMove.bind(this));

        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
        }
    }

    private onTouchStart(event: TouchEvent): void {
        const touch = event.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.touchStartTime = Date.now();

        // Start long press timer
        this.longPressTimer = setTimeout(() => {
            this.longPress.emit();
        }, this.LONG_PRESS_DURATION);
    }

    private onTouchMove(event: TouchEvent): void {
        // Cancel long press on move
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
    }

    private onTouchEnd(event: TouchEvent): void {
        // Clear long press timer
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }

        const touch = event.changedTouches[0];
        const touchEndX = touch.clientX;
        const touchEndY = touch.clientY;
        const touchDuration = Date.now() - this.touchStartTime;

        const deltaX = touchEndX - this.touchStartX;
        const deltaY = touchEndY - this.touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Check if it's a swipe (horizontal movement > vertical movement)
        if (absDeltaX > this.SWIPE_THRESHOLD && absDeltaX > absDeltaY) {
            if (deltaX > 0) {
                this.swipeRight.emit();
            } else {
                this.swipeLeft.emit();
            }
        }
        // Check if it's a tap (quick touch with minimal movement)
        else if (touchDuration < 300 && absDeltaX < 10 && absDeltaY < 10) {
            this.tap.emit();
        }
    }
}
