import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, JsonpModule} from '@angular/http';
import { AppComponent } from './app.component';

import {Ng2CompleterModule} from "ng2-completer";
import {AirportService} from "./airport.service";
import {DataService} from "./data.service";
import {ChartModule} from "angular2-highcharts";
import { HeaderComponent } from './header/header.component';
import {IflyoutRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    ChartModule,
    IflyoutRoutingModule
  ],
  providers: [AirportService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
