(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('signature_pad')) :
    typeof define === 'function' && define.amd ? define('angular2-signaturepad', ['exports', '@angular/core', 'signature_pad'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['angular2-signaturepad'] = {}, global.ng.core, global.SignaturePadNative));
}(this, (function (exports, i0, SignaturePadNative) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var SignaturePadNative__default = /*#__PURE__*/_interopDefaultLegacy(SignaturePadNative);

    var SignaturePad = /** @class */ (function () {
        function SignaturePad(elementRef) {
            // no op
            this.elementRef = elementRef;
            this.options = this.options || {};
            this.onBeginEvent = new i0.EventEmitter();
            this.onEndEvent = new i0.EventEmitter();
        }
        SignaturePad.prototype.ngAfterContentInit = function () {
            var canvas = this.elementRef.nativeElement.querySelector('canvas');
            if (this.options.canvasHeight) {
                canvas.height = this.options.canvasHeight;
            }
            if (this.options.canvasWidth) {
                canvas.width = this.options.canvasWidth;
            }
            this.signaturePad = new SignaturePadNative__default['default'](canvas, this.options);
            this.signaturePad.onBegin = this.onBegin.bind(this);
            this.signaturePad.onEnd = this.onEnd.bind(this);
        };
        SignaturePad.prototype.ngOnDestroy = function () {
            var canvas = this.elementRef.nativeElement.querySelector('canvas');
            canvas.width = 0;
            canvas.height = 0;
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
            if (this.signaturePad) {
                return this.signaturePad.toData();
            }
            else {
                return [];
            }
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
            // set default height and width on read data from URL
            if (!options.hasOwnProperty('height') &&
                this.options.canvasHeight) {
                options.height = this.options.canvasHeight;
            }
            if (!options.hasOwnProperty('width') && this.options.canvasWidth) {
                options.width = this.options.canvasWidth;
            }
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
        SignaturePad.prototype.queryPad = function () {
            return this.signaturePad;
        };
        return SignaturePad;
    }());
    SignaturePad.ɵfac = function SignaturePad_Factory(t) { return new (t || SignaturePad)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    SignaturePad.ɵcmp = i0.ɵɵdefineComponent({ type: SignaturePad, selectors: [["signature-pad"]], inputs: { options: "options" }, outputs: { onBeginEvent: "onBeginEvent", onEndEvent: "onEndEvent" }, decls: 1, vars: 0, template: function SignaturePad_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "canvas");
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignaturePad, [{
                type: i0.Component,
                args: [{
                        template: '<canvas></canvas>',
                        selector: 'signature-pad',
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
                    type: i0.Input
                }], onBeginEvent: [{
                    type: i0.Output
                }], onEndEvent: [{
                    type: i0.Output
                }] });
    })();

    var SignaturePadModule = /** @class */ (function () {
        function SignaturePadModule() {
        }
        return SignaturePadModule;
    }());
    SignaturePadModule.ɵmod = i0.ɵɵdefineNgModule({ type: SignaturePadModule });
    SignaturePadModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SignaturePadModule_Factory(t) { return new (t || SignaturePadModule)(); }, imports: [[]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SignaturePadModule, { declarations: [SignaturePad], exports: [SignaturePad] }); })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignaturePadModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [SignaturePad],
                        imports: [],
                        exports: [SignaturePad],
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of angular2-signaturepad
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SignaturePad = SignaturePad;
    exports.SignaturePadModule = SignaturePadModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-signaturepad.umd.js.map
