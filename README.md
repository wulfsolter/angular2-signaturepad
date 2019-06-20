# ngx-signaturepad
![GitHub](https://img.shields.io/github/license/fclemonschool/ngx-signaturepad.svg)
![npm (tag)](https://img.shields.io/npm/v/ngx-signaturepad/latest.svg)

Fork of [wulfsolter/angular2-signaturepad](https://www.npmjs.com/package/angular2-signaturepad).

## Install
`npm install ngx-signaturepad --save`

## Reference Implementation

* [Live Demo](http://lathonez.com/angular2-signaturepad-demo/) - angular2-signaturepad Demo
* [Source](https://github.com/lathonez/angular2-signaturepad-demo) - angular2-signaturepad Demo

## Usage example

API is identical to [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

Options are as per [szimek/signature_pad](https://www.npmjs.com/package/signature_pad) with the following additions:
* canvasWidth: width of the canvas (px)
* canvasHeight: height of the canvas (px)
The above options are provided to avoid accessing the DOM directly from your component to adjust the canvas size.

```typescript

// import into app module

import { SignaturePadModule } from 'ngx-signaturepad';

...

@NgModule({
  declarations: [ ],
  imports: [ SignaturePadModule ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})

// then import for use in a component

import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'ngx-signaturepad/signature-pad';

@Component({
  template: '<signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>'
})

export class SignaturePadPage{

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  constructor() {
    // no-op
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
}
```
