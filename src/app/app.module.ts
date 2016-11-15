import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { MainSearchComponent } from './main-search/main-search.component';
import {Ng2CompleterModule} from "ng2-completer";
import {AirportService} from "./airport.service";
import {DataService} from "./data.service";

@NgModule({
  declarations: [
    AppComponent,
    MainSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    Ng2CompleterModule
  ],
  providers: [AirportService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
