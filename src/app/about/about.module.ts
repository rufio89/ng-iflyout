import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AboutComponent} from "./about.component";
import { FormsModule } from '@angular/forms';
import {ChartModule} from "angular2-highcharts";


const routes = [
  { path: "", component: AboutComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ChartModule,
  ],
  declarations: [
    AboutComponent
  ]
})

export default class AboutModule{}
