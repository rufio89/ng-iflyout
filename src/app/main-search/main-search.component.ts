import { Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Day} from "../day";
import {Week} from "../week";
import {Destination} from "../destination";
import { CompleterService, CompleterData } from 'ng2-completer';
import {AirportService} from "../airport.service";

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent {
  searchForm: FormGroup;
  daysOfWeek: Day[];
  numOfWeeks: Week[];
  destinations : Destination[];
  private dataService: CompleterData;


  constructor(fb: FormBuilder, private service: AirportService, private completerService: CompleterService) {
    this.searchForm = fb.group({
      'departureAirport' : [],
      'arrivalAirport': [],
      'day': ['', Validators.required],
      'week': ['', Validators.required]
    });

    this.daysOfWeek = [
      {id: 1, dayName: 'Monday'},
      {id: 2, dayName: 'Tuesday'},
      {id: 2, dayName:  'Wednesday'},
      {id: 2, dayName: 'Thursday'},
      {id: 2, dayName: 'Friday'},
      {id: 2, dayName: 'Saturday'},
      {id: 2, dayName: 'Sunday'}
    ];
    this.numOfWeeks = [
      {id:1, nums:1},
      {id:2, nums:2},
      {id:3, nums:3}
    ];


  }


  onSubmit(value: string): void{
    console.log("You Submitted Value: ", value);
  }




}
