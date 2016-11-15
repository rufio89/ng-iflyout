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
  numOfMonths: Week[];
  destinations = [];
  departures = [];
  dayOfWeek: number;
  numMonths: number;
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
    this.numOfMonths = [
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
    console.log(this.numMonths);
    this.dayOfWeek = dayNum;
    if(this.numMonths!== undefined){
      this.calculateDates();
    }

  }

  updateMonth(monthNum: number){
    this.numMonths = monthNum;
  }

  addDays(day: Date, days: number)
  {
    let dat = new Date(day.getTime());
    dat.setDate(dat.getDate() + days);
    return dat;
  }

  addMonths(month, value: number) {
    let dat = new Date(month);
    dat.setMonth(dat.getMonth() + value);
    return dat;
  };

  dayNumDiff(currentDayNum: number, otherDayNum: number){
    let dayDiff = 0;
    if (currentDayNum > otherDayNum) {
      dayDiff = otherDayNum - currentDayNum;
    }
    else {
      dayDiff = otherDayNum - currentDayNum;
    }

    return dayDiff;
  }

  dayDiff(firstDate, secondDate){
    return secondDate - firstDate;
  }



  calculateDates(){
    this.dateList = [];
    let currentDate = new Date();
    let currentDayNum = currentDate.getDay();
    let dayDiff = this.dayNumDiff(currentDayNum, this.dayOfWeek);
    let newDat = new Date();

    newDat.setDate(currentDate.getDate() + dayDiff);

    let iterDate = newDat;

    let futureDate = new Date(iterDate.getTime());
    futureDate.setMonth(futureDate.getMonth() + this.numMonths);
    let sunday =  new Date(iterDate.getTime());
    sunday.setDate(sunday.getDate() + (7 - this.dayOfWeek));
    //console.log(iterDate);
    //console.log(futureDate);

    while(iterDate < futureDate){

      let date1 = iterDate.getFullYear() + '-' + (iterDate.getMonth()+1) +'-' + iterDate.getDate();
      let date2 = sunday.getFullYear() + '-' +  (sunday.getMonth()+1)  +'-'+ sunday.getDate();
      //console.log("DATE1: " + date1);
      //console.log("DATE2: " + date2);
      //console.log("MM: " + mm);
      //console.log("MM2: " + mm2);
      this.dateList.push(new DateList(date1, date2));
      iterDate.setDate(iterDate.getDate() + 7);
      sunday.setDate(sunday.getDate() + 7);

    }
  }

  requestFlights(){
    for(let dest of this.destinations ){
      for(let date of this.dateList){
        // console.log(date.departureDate);
        // console.log(date.returnDate);
        this.dataService.search(this.departures[0], dest, date.departureDate, date.returnDate);
      }
    }
  }

  onSubmit(value: string): void{
    this.calculateDates();
    this.dataService.search("ORD", "LAX", "2016-11-24", "2016-11-30");

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
