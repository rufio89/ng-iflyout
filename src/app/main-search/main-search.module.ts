import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MainSearchComponent} from "./main-search.component";
import {SearchResultsComponent} from "../search-results/search-results.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChartModule} from "angular2-highcharts";
import {Ng2CompleterModule} from "ng2-completer";

const routes = [
  { path: "", component: MainSearchComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ChartModule,
    ReactiveFormsModule,
    Ng2CompleterModule

  ],
  declarations: [
    MainSearchComponent,
    SearchResultsComponent
  ]
})

export default class MainSearchModule{}
