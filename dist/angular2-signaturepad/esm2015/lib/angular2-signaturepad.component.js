import { Component, EventEmitter, Input, Output, } from '@angular/core';
import * as SignaturePadNative from 'signature_pad';
import * as i0 from "@angular/core";
export class SignaturePad {
    constructor(elementRef) {
        // no op
        this.elementRef = elementRef;
        this.options = this.options || {};
        this.onBeginEvent = new EventEmitter();
        this.onEndEvent = new EventEmitter();
    }
    ngAfterContentInit() {
        const canvas = this.elementRef.nativeElement.querySelector('canvas');
        if (this.options.canvasHeight) {
            canvas.height = this.options.canvasHeight;
        }
        if (this.options.canvasWidth) {
            canvas.width = this.options.canvasWidth;
        }
        this.signaturePad = new SignaturePadNative.default(canvas, this.options);
        this.signaturePad.onBegin = this.onBegin.bind(this);
        this.signaturePad.onEnd = this.onEnd.bind(this);
    }
    ngOnDestroy() {
        const canvas = this.elementRef.nativeElement.querySelector('canvas');
        canvas.width = 0;
        canvas.height = 0;
    }
    resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const canvas = this.signaturePad._canvas;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }
    // Returns signature image as an array of point groups
    toData() {
        if (this.signaturePad) {
            return this.signaturePad.toData();
        }
        else {
            return [];
        }
    }
    // Draws signature image from an array of point groups
    fromData(points) {
        this.signaturePad.fromData(points);
    }
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
    toDataURL(imageType, quality) {
        return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
    }
    // Draws signature image from data URL
    fromDataURL(dataURL, options = {}) {
        // set default height and width on read data from URL
        if (!options.hasOwnProperty('height') &&
            this.options.canvasHeight) {
            options.height = this.options.canvasHeight;
        }
        if (!options.hasOwnProperty('width') && this.options.canvasWidth) {
            options.width = this.options.canvasWidth;
        }
        this.signaturePad.fromDataURL(dataURL, options);
    }
    // Clears the canvas
    clear() {
        this.signaturePad.clear();
    }
    // Returns true if canvas is empty, otherwise returns false
    isEmpty() {
        return this.signaturePad.isEmpty();
    }
    // Unbinds all event handlers
    off() {
        this.signaturePad.off();
    }
    // Rebinds all event handlers
    on() {
        this.signaturePad.on();
    }
    // set an option on the signaturePad - e.g. set('minWidth', 50);
    set(option, value) {
        switch (option) {
            case 'canvasHeight':
                this.signaturePad._canvas.height = value;
                break;
            case 'canvasWidth':
                this.signaturePad._canvas.width = value;
                break;
            default:
                this.signaturePad[option] = value;
        }
    }
    // notify subscribers on signature begin
    onBegin() {
        this.onBeginEvent.emit(true);
    }
    // notify subscribers on signature end
    onEnd() {
        this.onEndEvent.emit(true);
    }
    queryPad() {
        return this.signaturePad;
    }
}
SignaturePad.ɵfac = function SignaturePad_Factory(t) { return new (t || SignaturePad)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
SignaturePad.ɵcmp = i0.ɵɵdefineComponent({ type: SignaturePad, selectors: [["signature-pad"]], inputs: { options: "options" }, outputs: { onBeginEvent: "onBeginEvent", onEndEvent: "onEndEvent" }, decls: 1, vars: 0, template: function SignaturePad_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "canvas");
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignaturePad, [{
        type: Component,
        args: [{
                template: '<canvas></canvas>',
                selector: 'signature-pad',
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
            type: Input
        }], onBeginEvent: [{
            type: Output
        }], onEndEvent: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItc2lnbmF0dXJlcGFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNpZ25hdHVyZXBhZC9zcmMvbGliL2FuZ3VsYXIyLXNpZ25hdHVyZXBhZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEtBQUssa0JBQWtCLE1BQU0sZUFBZSxDQUFDOztBQWNwRCxNQUFNLE9BQU8sWUFBWTtJQVF2QixZQUFZLFVBQXNCO1FBQ2hDLFFBQVE7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixNQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUUsSUFBSyxJQUFJLENBQUMsT0FBZSxDQUFDLFlBQVksRUFBRTtZQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFJLElBQUksQ0FBQyxPQUFlLENBQUMsWUFBWSxDQUFDO1NBQ3BEO1FBRUQsSUFBSyxJQUFJLENBQUMsT0FBZSxDQUFDLFdBQVcsRUFBRTtZQUNyQyxNQUFNLENBQUMsS0FBSyxHQUFJLElBQUksQ0FBQyxPQUFlLENBQUMsV0FBVyxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVB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QUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDZCQUE2QjtJQUN0QixFQUFFO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsZ0VBQWdFO0lBQ3pELEdBQUcsQ0FBQyxNQUFjLEVBQUUsS0FBVTtRQUNuQyxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssY0FBYztnQkFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDekMsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDeEMsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELHdDQUF3QztJQUNqQyxPQUFPO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELHNDQUFzQztJQUMvQixLQUFLO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQzs7d0VBbElVLFlBQVk7aURBQVosWUFBWTtRQUhaLHlCQUFpQjs7dUZBR2pCLFlBQVk7Y0FKeEIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSxlQUFlO2FBQzFCOzZEQUVpQixPQUFPO2tCQUF0QixLQUFLO1lBQ1csWUFBWTtrQkFBNUIsTUFBTTtZQUNVLFVBQVU7a0JBQTFCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgU2lnbmF0dXJlUGFkTmF0aXZlIGZyb20gJ3NpZ25hdHVyZV9wYWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHRpbWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgUG9pbnRHcm91cCA9IEFycmF5PFBvaW50PjtcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiAnPGNhbnZhcz48L2NhbnZhcz4nLFxuICBzZWxlY3RvcjogJ3NpZ25hdHVyZS1wYWQnLFxufSlcbmV4cG9ydCBjbGFzcyBTaWduYXR1cmVQYWQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uczogYW55O1xuICBAT3V0cHV0KCkgcHVibGljIG9uQmVnaW5FdmVudDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICBAT3V0cHV0KCkgcHVibGljIG9uRW5kRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICBwcml2YXRlIHNpZ25hdHVyZVBhZDogYW55O1xuICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIC8vIG5vIG9wXG4gICAgdGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vbkJlZ2luRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5vbkVuZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjYW52YXM6IGFueSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuXG4gICAgaWYgKCh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNIZWlnaHQpIHtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY2FudmFzSGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICgodGhpcy5vcHRpb25zIGFzIGFueSkuY2FudmFzV2lkdGgpIHtcbiAgICAgIGNhbnZhcy53aWR0aCA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNXaWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLnNpZ25hdHVyZVBhZCA9IG5ldyBTaWduYXR1cmVQYWROYXRpdmUuZGVmYXVsdChjYW52YXMsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub25CZWdpbiA9IHRoaXMub25CZWdpbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uRW5kID0gdGhpcy5vbkVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhczogYW55ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gMDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gMDtcbiAgfVxuXG4gIHB1YmxpYyByZXNpemVDYW52YXMoKTogdm9pZCB7XG4gICAgLy8gV2hlbiB6b29tZWQgb3V0IHRvIGxlc3MgdGhhbiAxMDAlLCBmb3Igc29tZSB2ZXJ5IHN0cmFuZ2UgcmVhc29uLFxuICAgIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IGRldmljZVBpeGVsUmF0aW8gYXMgbGVzcyB0aGFuIDFcbiAgICAvLyBhbmQgb25seSBwYXJ0IG9mIHRoZSBjYW52YXMgaXMgY2xlYXJlZCB0aGVuLlxuICAgIGNvbnN0IHJhdGlvOiBudW1iZXIgPSBNYXRoLm1heCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLCAxKTtcbiAgICBjb25zdCBjYW52YXM6IGFueSA9IHRoaXMuc2lnbmF0dXJlUGFkLl9jYW52YXM7XG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLm9mZnNldFdpZHRoICogcmF0aW87XG4gICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5vZmZzZXRIZWlnaHQgKiByYXRpbztcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5zY2FsZShyYXRpbywgcmF0aW8pO1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmNsZWFyKCk7IC8vIG90aGVyd2lzZSBpc0VtcHR5KCkgbWlnaHQgcmV0dXJuIGluY29ycmVjdCB2YWx1ZVxuICB9XG5cbiAgLy8gUmV0dXJucyBzaWduYXR1cmUgaW1hZ2UgYXMgYW4gYXJyYXkgb2YgcG9pbnQgZ3JvdXBzXG4gIHB1YmxpYyB0b0RhdGEoKTogQXJyYXk8UG9pbnRHcm91cD4ge1xuICAgIGlmICh0aGlzLnNpZ25hdHVyZVBhZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkLnRvRGF0YSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgLy8gRHJhd3Mgc2lnbmF0dXJlIGltYWdlIGZyb20gYW4gYXJyYXkgb2YgcG9pbnQgZ3JvdXBzXG4gIHB1YmxpYyBmcm9tRGF0YShwb2ludHM6IEFycmF5PFBvaW50R3JvdXA+KTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuZnJvbURhdGEocG9pbnRzIGFzIGFueSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIHNpZ25hdHVyZSBpbWFnZSBhcyBkYXRhIFVSTCAoc2VlIGh0dHBzOi8vbWRuLmlvL3RvZGF0YXVybCBmb3IgdGhlIGxpc3Qgb2YgcG9zc2libGUgcGFyYW10ZXJzKVxuICBwdWJsaWMgdG9EYXRhVVJMKGltYWdlVHlwZT86IHN0cmluZywgcXVhbGl0eT86IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkLnRvRGF0YVVSTChpbWFnZVR5cGUsIHF1YWxpdHkpOyAvLyBzYXZlIGltYWdlIGFzIGRhdGEgVVJMXG4gIH1cblxuICAvLyBEcmF3cyBzaWduYXR1cmUgaW1hZ2UgZnJvbSBkYXRhIFVSTFxuICBwdWJsaWMgZnJvbURhdGFVUkwoZGF0YVVSTDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSk6IHZvaWQge1xuICAgIC8vIHNldCBkZWZhdWx0IGhlaWdodCBhbmQgd2lkdGggb24gcmVhZCBkYXRhIGZyb20gVVJMXG4gICAgaWYgKFxuICAgICAgIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2hlaWdodCcpICYmXG4gICAgICAodGhpcy5vcHRpb25zIGFzIGFueSkuY2FudmFzSGVpZ2h0XG4gICAgKSB7XG4gICAgICBvcHRpb25zLmhlaWdodCA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jYW52YXNIZWlnaHQ7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJiAodGhpcy5vcHRpb25zIGFzIGFueSkuY2FudmFzV2lkdGgpIHtcbiAgICAgIG9wdGlvbnMud2lkdGggPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY2FudmFzV2lkdGg7XG4gICAgfVxuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmZyb21EYXRhVVJMKGRhdGFVUkwsIG9wdGlvbnMpO1xuICB9XG5cbiAgLy8gQ2xlYXJzIHRoZSBjYW52YXNcbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmNsZWFyKCk7XG4gIH1cblxuICAvLyBSZXR1cm5zIHRydWUgaWYgY2FudmFzIGlzIGVtcHR5LCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxuICBwdWJsaWMgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQuaXNFbXB0eSgpO1xuICB9XG5cbiAgLy8gVW5iaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnNcbiAgcHVibGljIG9mZigpOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5vZmYoKTtcbiAgfVxuXG4gIC8vIFJlYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzXG4gIHB1YmxpYyBvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5vbigpO1xuICB9XG5cbiAgLy8gc2V0IGFuIG9wdGlvbiBvbiB0aGUgc2lnbmF0dXJlUGFkIC0gZS5nLiBzZXQoJ21pbldpZHRoJywgNTApO1xuICBwdWJsaWMgc2V0KG9wdGlvbjogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgIGNhc2UgJ2NhbnZhc0hlaWdodCc6XG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUGFkLl9jYW52YXMuaGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2FudmFzV2lkdGgnOlxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZC5fY2FudmFzLndpZHRoID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWRbb3B0aW9uXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmeSBzdWJzY3JpYmVycyBvbiBzaWduYXR1cmUgYmVnaW5cbiAgcHVibGljIG9uQmVnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5vbkJlZ2luRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIC8vIG5vdGlmeSBzdWJzY3JpYmVycyBvbiBzaWduYXR1cmUgZW5kXG4gIHB1YmxpYyBvbkVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uRW5kRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBxdWVyeVBhZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZDtcbiAgfVxufSJdfQ==