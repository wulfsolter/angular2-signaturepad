'use strict';

import { Component, ElementRef, EventEmitter, Input, Output } from 'angular2/core';

declare var require: any;

@Component({
  inputs: ['options'],
  template: '<canvas></canvas>',
  selector: 'signature-pad',
})

export class SignaturePad {

  private signature_pad: any;
  @Input() options: Object;
  @Output() private onEndEvent: EventEmitter<boolean>;

  constructor(private elementRef: ElementRef) {
    // no op
    this.options = this.options || {};
    this.onEndEvent = new EventEmitter();
  }

  ngAfterContentInit() {
    let sp = require('signature_pad');
    let canvas = this.elementRef.nativeElement.getElementsByTagName('canvas')[0];
    this.signature_pad = new sp(canvas, this.options);
    this.signature_pad.onEnd = this.onEnd.bind(this);
  }

  // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
  public toDataURL(): string {
    return this.signature_pad.toDataURL(); // save image as PNG
  }

  // Draws signature image from data URL
  public fromDataURL(dataURL: string): void {
    this.signature_pad.fromDataURL(dataURL);
  }

  // Clears the canvas
  public clear(): void {
    this.signature_pad.clear();
  }

  // Returns true if canvas is empty, otherwise returns false
  public isEmpty(): boolean {
    return this.signature_pad.isEmpty();
  }

  // Unbinds all event handlers
  public off(): void {
    this.signature_pad.off();
  }

  // Rebinds all event handlers
  public on(): void {
    this.signature_pad.on();
  }

  // set an option on the signaturePad - e.g. set('minWidth', 50);
  public set(option: string, value: any): void {
    this.signature_pad[option] = value;
  }

  // notify subscribers on signature end
  public onEnd(): void {
    this.onEndEvent.emit(true);
  }
}

