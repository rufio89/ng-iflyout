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

  convertDate(d)
  {
    var parts = d.split('/');
    return new Date(parts[1], parts[0]);
  }

  calculateDates(){
    console.clear();
    let currentDate = new Date();
    let currentDayNum = currentDate.getDay();
    let dayDiff = this.dayNumDiff(currentDayNum, this.dayOfWeek);
    let newCurrentDate = new Date();

    newCurrentDate.setDate(currentDate.getDate() + dayDiff);
    // if(currentDate > newCurrentDate){
    //   newCurrentDate = this.addDays(newCurrentDate, 7);
    // }
    let iterDate = newCurrentDate;
    let mm = iterDate.getMonth()+1;
    let mm2 = iterDate.getMonth() + this.numMonths;
    if(mm2 > 12){
      mm2 = mm2 - 12;
    }
    while(mm !=mm2){
      if(mm>12){
        mm=0;
      }
      if(mm==mm2){ break;}
      console.log(mm);
      console.log(mm2)
      //get last day of month
      let lastDate = new Date(iterDate.getFullYear(), mm,0);


      //check if last day in month
      let currentDayDiff = this.dayDiff(iterDate.getDate(), lastDate.getDate());

      if(currentDayDiff < 7){
        //Need to increment month by one because it is last day
        iterDate = new Date(iterDate.getFullYear(),mm,1);
        //console.log("II: " + iterDate);
        let newDateDiff = this.dayNumDiff(iterDate.getDay(), this.dayOfWeek);
        //console.log("AA: " + Number(this.addDays(iterDate, newDateDiff)));
        //if datediff goes below 0 it brings you back into the previous month
        let d1 = this.addDays(iterDate, newDateDiff);
        let d2 = iterDate;
        // console.log(d1);
        // console.log(d2);
        // console.log(d1 < d2);
        if(d1 < d2){
          newDateDiff = newDateDiff + 7;
        }
        // console.log(newDateDiff);
        // console.log("iterdate before " + iterDate);

        iterDate.setDate(this.addDays(iterDate, newDateDiff).getDate());

        //console.log("iterdate after" + iterDate);
        mm=mm+1;

      }
      else {

        iterDate.setDate(this.addDays(iterDate, 7).getDate());
      }
      console.log(iterDate);

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
