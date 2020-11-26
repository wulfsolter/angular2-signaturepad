import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Angular2SignaturepadModule } from '../../../angular2-signaturepad/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Angular2SignaturepadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
