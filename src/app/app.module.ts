import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GaugeChartModule } from 'angular-gauge-chart';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    GaugeChartModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
