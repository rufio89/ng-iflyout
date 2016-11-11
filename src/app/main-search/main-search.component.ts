import { Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Day} from "../day";
import {Week} from "../week";
import { CompleterService, CompleterData } from 'ng2-completer';
import {AirportService} from "../airport.service";
import {createSecureContext} from "tls";

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent {
  searchForm: FormGroup;
  daysOfWeek: Day[];
  numOfWeeks: Week[];
  destinations = [];
  departures = [];
  private departureService: CompleterData;
  private arrivalService: CompleterData;
  private searchData = [];
  private currentDestination: string;



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

    service.search().subscribe( res => {
      this.searchData = res;
      this.arrivalService = completerService.local(this.searchData, 'city', 'code');
      this.departureService = completerService.local(this.searchData, 'city', 'code');
    });



  }


  onSubmit(value: string): void{
    console.log("You Submitted Value: ", value);
    console.log(this.destinations);
  }



  keypressHandler(event, newValue: string, isDest: boolean){
   // console.log(event);
    if(event.charCode == 13){
        this.create(newValue, isDest);
    }
    console.log(this.destinations);
  }

  create(newValue: string, isDest:boolean): boolean{
    console.log("CREATE ISDEST:" + isDest);
    if(isDest) {
      console.log(this.destinations);
      this.destinations.push(newValue);
    }
    else{
      console.log(this.departures);
      this.departures = [];
      this.departures.push(newValue);
    }

    return false;
  }

  remove(name: string, isDest:boolean) : void {
    console.log("REMOVE ISDEST:" + isDest);
    if(isDest) {
      var index = this.destinations.indexOf(name, 0);
      if (index !== undefined) {
        this.destinations.splice(index, 1);
        console.log(this.destinations);
      }
    }
    else{
      var index = this.departures.indexOf(name, 0);
      if (index !== undefined) {
        this.departures.splice(index, 1);
        console.log(this.departures);
      }
    }


  }






}
