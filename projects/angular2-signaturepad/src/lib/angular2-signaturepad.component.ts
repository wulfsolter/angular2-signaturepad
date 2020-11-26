import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';

import * as SignaturePadNative from 'signature_pad';

export interface Point {
  x: number;
  y: number;
  time: number;
}

export type PointGroup = Array<Point>;

@Component({
  template: '<canvas></canvas>',
  selector: 'signature-pad',
})
export class SignaturePad implements AfterContentInit, OnDestroy {
  @Input() public options: any;
  @Output() public onBeginEvent: EventEmitter<boolean>;
  @Output() public onEndEvent: EventEmitter<boolean>;

  private signaturePad: any;
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    // no op
    this.elementRef = elementRef;
    this.options = this.options || {};
    this.onBeginEvent = new EventEmitter();
    this.onEndEvent = new EventEmitter();
  }

  public ngAfterContentInit(): void {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');

    if ((this.options as any).canvasHeight) {
      canvas.height = (this.options as any).canvasHeight;
    }

    if ((this.options as any).canvasWidth) {
      canvas.width = (this.options as any).canvasWidth;
    }

    this.signaturePad = new SignaturePadNative.default(canvas, this.options);
    this.signaturePad.onBegin = this.onBegin.bind(this);
    this.signaturePad.onEnd = this.onEnd.bind(this);
  }

  public ngOnDestroy(): void {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = 0;
    canvas.height = 0;
  }

  public resizeCanvas(): void {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    const ratio: number = Math.max(window.devicePixelRatio || 1, 1);
    const canvas: any = this.signaturePad.canvas;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
  }

  // Returns signature image as an array of point groups
  public toData(): Array<PointGroup> {
    if (this.signaturePad) {
      return this.signaturePad.toData();
    } else {
      return [];
    }
  }

  // Draws signature image from an array of point groups
  public fromData(points: Array<PointGroup>): void {
    this.signaturePad.fromData(points as any);
  }

  // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
  public toDataURL(imageType?: string, quality?: number): string {
    return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
  }

  // Draws signature image from data URL
  public fromDataURL(dataURL: string, options: any = {}): void {
    // set default height and width on read data from URL
    if (
      !options.hasOwnProperty('height') &&
      (this.options as any).canvasHeight
    ) {
      options.height = (this.options as any).canvasHeight;
    }
    if (!options.hasOwnProperty('width') && (this.options as any).canvasWidth) {
      options.width = (this.options as any).canvasWidth;
    }
    this.signaturePad.fromDataURL(dataURL, options);
  }

  // Clears the canvas
  public clear(): void {
    this.signaturePad.clear();
  }

  // Returns true if canvas is empty, otherwise returns false
  public isEmpty(): boolean {
    return this.signaturePad.isEmpty();
  }

  // Unbinds all event handlers
  public off(): void {
    this.signaturePad.off();
  }

  // Rebinds all event handlers
  public on(): void {
    this.signaturePad.on();
  }

  // set an option on the signaturePad - e.g. set('minWidth', 50);
  public set(option: string, value: any): void {
    switch (option) {
      case 'canvasHeight':
        this.signaturePad.canvas.height = value;
        break;
      case 'canvasWidth':
        this.signaturePad.canvas.width = value;
        break;
      default:
        this.signaturePad[option] = value;
    }
  }

  // notify subscribers on signature begin
  public onBegin(): void {
    this.onBeginEvent.emit(true);
  }

  // notify subscribers on signature end
  public onEnd(): void {
    this.onEndEvent.emit(true);
  }

  public queryPad(): any {
    return this.signaturePad;
  }
}
