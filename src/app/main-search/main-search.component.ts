import { Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {Day} from "../day";
import {Week} from "../week";
import { CompleterService, CompleterData } from 'ng2-completer';
import {AirportService} from "../airport.service";
import {createSecureContext} from "tls";
import {DataService} from "../data.service";
import {DateList} from "../datelist";

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent {
  searchForm: FormGroup;
  departureAirport: AbstractControl;
  arrivalAirport: AbstractControl;
  day: AbstractControl;
  week: AbstractControl;
  daysOfWeek: Day[];
  numOfWeeks: Week[];
  destinations = [];
  departures = [];
  dayOfWeek: number;
  numWeeks: number;
  dateList: DateList[];
  private departureService: CompleterData;
  private arrivalService: CompleterData;
  private searchData = [];




  constructor(fb: FormBuilder, private airportService: AirportService, private completerService: CompleterService, private dataService: DataService) {
    this.searchForm = fb.group({
      'departureAirport' : ['Chicago',Validators.required],
      'arrivalAirport': ['Los Angeles', Validators.required],
      'day': ['', Validators.required],
      'week': ['', Validators.required]
    });

    this.daysOfWeek = [
      {id: 1, dayName: 'Monday'},
      {id: 2, dayName: 'Tuesday'},
      {id: 3, dayName:  'Wednesday'},
      {id: 4, dayName: 'Thursday'},
      {id: 5, dayName: 'Friday'},
      {id: 6, dayName: 'Saturday'},
      {id: 7, dayName: 'Sunday'}
    ];
    this.numOfWeeks = [
      {id:1, nums:1},
      {id:2, nums:2},
      {id:3, nums:3}
    ];

    this.arrivalAirport = this.searchForm.controls['arrivalAirport'];
    this.departureAirport = this.searchForm.controls['departureAirport'];
    this.day = this.searchForm.controls['day'];
    this.week = this.searchForm.controls['week'];

    airportService.search().subscribe( res => {
      this.searchData = res;
      this.arrivalService = completerService.local(this.searchData, 'city', 'code');
      this.departureService = completerService.local(this.searchData, 'city', 'code');
    });



  }

  updateDay(dayNum: number){
    console.log(this.numWeeks);
    this.dayOfWeek = dayNum;
    if(this.numWeeks!== undefined){
      this.calculateDates();
    }

  }

  updateWeek(weekNum: number){
    this.numWeeks = weekNum;
  }

  addDays(day, days: number)
  {
    var dat = new Date(day);
    dat.setDate(dat.getDate() + days);
    return dat;
  }

  dayDiff(currentDayNum, otherDayNum){
    let dayDiff = 0;
    if(currentDayNum > otherDayNum) {
      dayDiff = otherDayNum - currentDayNum;
    }
    else{
      dayDiff = currentDayNum - otherDayNum;
    }
    return dayDiff;
  }

  calculateDates(){
    let currentDate = new Date();
    let currentDayNum = currentDate.getDay();
    let dayDiff = this.dayDiff(currentDayNum, this.dayOfWeek);
    let newCurrentDate = new Date();

    newCurrentDate.setDate(currentDate.getDate() + dayDiff);
    // console.log(currentDayNum);
    // console.log("Day Num: " + dayDiff);

    //let dd = currentDate.getDate() + dayDiff;
    //let mm = currentDate.getMonth()+1;
    //let yyyy = currentDate.getFullYear();

    //let formattedDate = mm + '/' + dd + '/' + yyyy;
    for(let i=0;i<5;i++){
      let iterDate = new Date();
      let mm = newCurrentDate.getMonth()+1;
      let yyyy = newCurrentDate.getFullYear();
      let lastDate = new Date(yyyy, mm,0);
      iterDate = this.addDays(newCurrentDate, 7);
      newCurrentDate.setDate(iterDate.getDate());
      if(newCurrentDate > lastDate){
        newCurrentDate.setMonth(mm+1);
      }

    }



    // console.log(currentDate);
    // console.log(currentDayNum);
    // console.log("Calc Dates: " + this.dayOfWeek);
    // console.log("Calc Dates: " + this.numWeeks);


  }

  onSubmit(value: string): void{
    console.log(this.departures);
    console.log(this.destinations);
    console.log(value['day']);
    console.log(value['week']);
    // for(let dest of this.destinations){
    //
    // }
    this.calculateDates()

  }



  keypressHandler(event, newValue: string, isDest: boolean){
    this.create(newValue, isDest);
    //console.log(this.destinations);
  }

  create(newValue: string, isDest:boolean): boolean{
    //console.log("CREATE ISDEST:" + isDest);
    if(isDest) {
      //console.log(this.destinations);
      this.destinations.push(newValue);
    }
    else{
      //console.log(this.departures);
      this.departures = [];
      this.departures.push(newValue);
    }


    return false;
  }

  remove(name: string, isDest:boolean) : void {
    //console.log("REMOVE ISDEST:" + isDest);
    if(isDest) {
      var index = this.destinations.indexOf(name, 0);
      if (index !== undefined) {
        this.destinations.splice(index, 1);
        //console.log(this.destinations);
      }
    }
    else{
      var index = this.departures.indexOf(name, 0);
      if (index !== undefined) {
        this.departures.splice(index, 1);
       // console.log(this.departures);
      }
    }


  }






}
