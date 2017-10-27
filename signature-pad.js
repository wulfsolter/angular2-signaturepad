'use strict';
var core_1 = require('@angular/core');
;
var SignaturePad = (function () {
    function SignaturePad(elementRef) {
        // no op
        this.elementRef = elementRef;
        this.options = this.options || {};
        this.onBeginEvent = new core_1.EventEmitter();
        this.onEndEvent = new core_1.EventEmitter();
    }
    SignaturePad.prototype.ngAfterContentInit = function () {
        var sp = require('signature_pad')['default'];
        var canvas = this.elementRef.nativeElement.querySelector('canvas');
        if (this.options['canvasHeight']) {
            canvas.height = this.options['canvasHeight'];
        }
        if (this.options['canvasWidth']) {
            canvas.width = this.options['canvasWidth'];
        }
        this.signaturePad = new sp(canvas, this.options);
        this.signaturePad.onBegin = this.onBegin.bind(this);
        this.signaturePad.onEnd = this.onEnd.bind(this);
    };
    SignaturePad.prototype.resizeCanvas = function () {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        var canvas = this.signaturePad._canvas;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    };
    // Returns signature image as an array of point groups
    SignaturePad.prototype.toData = function () {
        return this.signaturePad.toData();
    };
    // Draws signature image from an array of point groups
    SignaturePad.prototype.fromData = function (points) {
        this.signaturePad.fromData(points);
    };
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
    SignaturePad.prototype.toDataURL = function (imageType, quality) {
        return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
    };
    // Draws signature image from data URL
    SignaturePad.prototype.fromDataURL = function (dataURL, options) {
        if (options === void 0) { options = {}; }
        this.signaturePad.fromDataURL(dataURL, options);
    };
    // Clears the canvas
    SignaturePad.prototype.clear = function () {
        this.signaturePad.clear();
    };
    // Returns true if canvas is empty, otherwise returns false
    SignaturePad.prototype.isEmpty = function () {
        return this.signaturePad.isEmpty();
    };
    // Unbinds all event handlers
    SignaturePad.prototype.off = function () {
        this.signaturePad.off();
    };
    // Rebinds all event handlers
    SignaturePad.prototype.on = function () {
        this.signaturePad.on();
    };
    // set an option on the signaturePad - e.g. set('minWidth', 50);
    SignaturePad.prototype.set = function (option, value) {
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
    };
    // notify subscribers on signature begin
    SignaturePad.prototype.onBegin = function () {
        this.onBeginEvent.emit(true);
    };
    // notify subscribers on signature end
    SignaturePad.prototype.onEnd = function () {
        this.onEndEvent.emit(true);
    };
    SignaturePad.decorators = [
        { type: core_1.Component, args: [{
                    template: '<canvas></canvas>',
                    selector: 'signature-pad',
                },] },
    ];
    /** @nocollapse */
    SignaturePad.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    SignaturePad.propDecorators = {
        'options': [{ type: core_1.Input },],
        'onBeginEvent': [{ type: core_1.Output },],
        'onEndEvent': [{ type: core_1.Output },],
    };
    return SignaturePad;
}());
exports.SignaturePad = SignaturePad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLXBhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ25hdHVyZS1wYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIscUJBQW1FLGVBQWUsQ0FBQyxDQUFBO0FBUWxGLENBQUM7QUFJRjtJQVNFLHNCQUFZLFVBQXNCO1FBQ2hDLFFBQVE7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0seUNBQWtCLEdBQXpCO1FBQ0UsSUFBSSxFQUFFLEdBQVEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4RSxFQUFFLENBQUMsQ0FBTyxJQUFJLENBQUMsT0FBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsTUFBTSxHQUFTLElBQUksQ0FBQyxPQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFPLElBQUksQ0FBQyxPQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDLE9BQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pE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LEdBQWQ7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsc0NBQXNDO0lBQy9CLDRCQUFLLEdBQVo7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0ksdUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLGVBQWU7aUJBQzFCLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUE2RDtRQUNsRixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO0tBQ25CLENBQUM7SUFDSywyQkFBYyxHQUEyQztRQUNoRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUM3QixjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUNuQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtLQUNoQyxDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBN0hELElBNkhDO0FBN0hZLG9CQUFZLGVBNkh4QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnQge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgdGltZTogbnVtYmVyO1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmF0dXJlUGFkIHtcclxuXHJcbiAgIHB1YmxpYyBvcHRpb25zOiBPYmplY3Q7XHJcbiAgIHB1YmxpYyBvbkJlZ2luRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcclxuICAgcHVibGljIG9uRW5kRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcclxuXHJcbiAgcHJpdmF0ZSBzaWduYXR1cmVQYWQ6IGFueTtcclxuICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcclxuICAgIC8vIG5vIG9wXHJcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBlbGVtZW50UmVmO1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9O1xyXG4gICAgdGhpcy5vbkJlZ2luRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm9uRW5kRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgbGV0IHNwOiBhbnkgPSByZXF1aXJlKCdzaWduYXR1cmVfcGFkJylbJ2RlZmF1bHQnXTtcclxuICAgIGxldCBjYW52YXM6IGFueSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xyXG5cclxuICAgIGlmICgoPGFueT50aGlzLm9wdGlvbnMpWydjYW52YXNIZWlnaHQnXSkge1xyXG4gICAgICBjYW52YXMuaGVpZ2h0ID0gKDxhbnk+dGhpcy5vcHRpb25zKVsnY2FudmFzSGVpZ2h0J107XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCg8YW55PnRoaXMub3B0aW9ucylbJ2NhbnZhc1dpZHRoJ10pIHtcclxuICAgICAgY2FudmFzLndpZHRoID0gKDxhbnk+dGhpcy5vcHRpb25zKVsnY2FudmFzV2lkdGgnXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNpZ25hdHVyZVBhZCA9IG5ldyBzcChjYW52YXMsIHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5vbkJlZ2luID0gdGhpcy5vbkJlZ2luLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5vbkVuZCA9IHRoaXMub25FbmQuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNpemVDYW52YXMoKTogdm9pZCB7XHJcbiAgICAvLyBXaGVuIHpvb21lZCBvdXQgdG8gbGVzcyB0aGFuIDEwMCUsIGZvciBzb21lIHZlcnkgc3RyYW5nZSByZWFzb24sXHJcbiAgICAvLyBzb21lIGJyb3dzZXJzIHJlcG9ydCBkZXZpY2VQaXhlbFJhdGlvIGFzIGxlc3MgdGhhbiAxXHJcbiAgICAvLyBhbmQgb25seSBwYXJ0IG9mIHRoZSBjYW52YXMgaXMgY2xlYXJlZCB0aGVuLlxyXG4gICAgY29uc3QgcmF0aW86IG51bWJlciA9IE1hdGgubWF4KHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsIDEpO1xyXG4gICAgY29uc3QgY2FudmFzOiBhbnkgPSB0aGlzLnNpZ25hdHVyZVBhZC5fY2FudmFzO1xyXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLm9mZnNldFdpZHRoICogcmF0aW87XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLm9mZnNldEhlaWdodCAqIHJhdGlvO1xyXG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuc2NhbGUocmF0aW8sIHJhdGlvKTtcclxuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmNsZWFyKCk7IC8vIG90aGVyd2lzZSBpc0VtcHR5KCkgbWlnaHQgcmV0dXJuIGluY29ycmVjdCB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgIC8vIFJldHVybnMgc2lnbmF0dXJlIGltYWdlIGFzIGFuIGFycmF5IG9mIHBvaW50IGdyb3Vwc1xyXG4gIHB1YmxpYyB0b0RhdGEoKTogQXJyYXk8UG9pbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC50b0RhdGEoKTtcclxuICB9XHJcblxyXG4gIC8vIERyYXdzIHNpZ25hdHVyZSBpbWFnZSBmcm9tIGFuIGFycmF5IG9mIHBvaW50IGdyb3Vwc1xyXG4gIHB1YmxpYyBmcm9tRGF0YShwb2ludHM6IEFycmF5PFBvaW50Pik6IHZvaWQge1xyXG4gICAgdGhpcy5zaWduYXR1cmVQYWQuZnJvbURhdGEocG9pbnRzKTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybnMgc2lnbmF0dXJlIGltYWdlIGFzIGRhdGEgVVJMIChzZWUgaHR0cHM6Ly9tZG4uaW8vdG9kYXRhdXJsIGZvciB0aGUgbGlzdCBvZiBwb3NzaWJsZSBwYXJhbXRlcnMpXHJcbiAgcHVibGljIHRvRGF0YVVSTChpbWFnZVR5cGU/OiBzdHJpbmcsIHF1YWxpdHk/OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkLnRvRGF0YVVSTChpbWFnZVR5cGUsIHF1YWxpdHkpOyAvLyBzYXZlIGltYWdlIGFzIGRhdGEgVVJMXHJcbiAgfVxyXG5cclxuICAvLyBEcmF3cyBzaWduYXR1cmUgaW1hZ2UgZnJvbSBkYXRhIFVSTFxyXG4gIHB1YmxpYyBmcm9tRGF0YVVSTChkYXRhVVJMOiBzdHJpbmcsIG9wdGlvbnM6IE9iamVjdCA9IHt9KTogdm9pZCB7XHJcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5mcm9tRGF0YVVSTChkYXRhVVJMLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8vIENsZWFycyB0aGUgY2FudmFzXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybnMgdHJ1ZSBpZiBjYW52YXMgaXMgZW1wdHksIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQuaXNFbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5iaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnNcclxuICBwdWJsaWMgb2ZmKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaWduYXR1cmVQYWQub2ZmKCk7XHJcbiAgfVxyXG5cclxuICAvLyBSZWJpbmRzIGFsbCBldmVudCBoYW5kbGVyc1xyXG4gIHB1YmxpYyBvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uKCk7XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgYW4gb3B0aW9uIG9uIHRoZSBzaWduYXR1cmVQYWQgLSBlLmcuIHNldCgnbWluV2lkdGgnLCA1MCk7XHJcbiAgcHVibGljIHNldChvcHRpb246IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG5cclxuICAgIHN3aXRjaCAob3B0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2NhbnZhc0hlaWdodCc6XHJcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWQuX2NhbnZhcy5oZWlnaHQgPSB2YWx1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2FudmFzV2lkdGgnOlxyXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUGFkLl9jYW52YXMud2lkdGggPSB2YWx1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZFtvcHRpb25dID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBub3RpZnkgc3Vic2NyaWJlcnMgb24gc2lnbmF0dXJlIGJlZ2luXHJcbiAgcHVibGljIG9uQmVnaW4oKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQmVnaW5FdmVudC5lbWl0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLy8gbm90aWZ5IHN1YnNjcmliZXJzIG9uIHNpZ25hdHVyZSBlbmRcclxuICBwdWJsaWMgb25FbmQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uRW5kRXZlbnQuZW1pdCh0cnVlKTtcclxuICB9XHJcbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcclxuICB0ZW1wbGF0ZTogJzxjYW52YXM+PC9jYW52YXM+JyxcclxuICBzZWxlY3RvcjogJ3NpZ25hdHVyZS1wYWQnLFxyXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidvcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29uQmVnaW5FdmVudCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25FbmRFdmVudCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xufVxyXG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==