import { Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {Day} from "../day";
import {Week} from "../week";
import { CompleterService, CompleterData } from 'ng2-completer';
import {AirportService} from "../airport.service";
import {DataService} from "../data.service";
import {DateList} from "../datelist";

import {FlightList} from "../flightlist";

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
  flightList: FlightList;
  prices: Array<number>;
  dates: Array<string>;
  options: Object;


  private departureService: CompleterData;
  private arrivalService: CompleterData;
  private searchData = [];




  constructor(fb: FormBuilder, private airportService: AirportService, private completerService: CompleterService, private dataService: DataService) {
    this.flightList = new FlightList;
    this.searchForm = fb.group({
      'departureAirport' : ['',Validators.required],
      'arrivalAirport': ['', Validators.required],
      'day': ['', Validators.required],
      'week': ['', Validators.required]
    });



    this.daysOfWeek = [
      {id: 0, dayName: 'Sunday'},
      {id: 1, dayName: 'Monday'},
      {id: 2, dayName: 'Tuesday'},
      {id: 3, dayName: 'Wednesday'},
      {id: 4, dayName: 'Thursday'},
      {id: 5, dayName: 'Friday'},
      {id: 6, dayName: 'Saturday'}
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
    console.log(this.dayOfWeek);
    this.dayOfWeek = dayNum;
    console.log(this.dayOfWeek);
    this.calculateDates();
    if(this.destinations.length > 0) {
      this.refreshFlights();
    }
  }

  updateMonth(monthNum: number){
    this.numMonths = monthNum;
    this.calculateDates();
    if(this.destinations.length > 0) {
      this.refreshFlights();
    }
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
    console.log(iterDate.getDay());
    console.log(this.dayOfWeek);
    if(iterDate.getDay() <= currentDate.getDay() ){
      console.log("IN HERE");
      iterDate.setDate(iterDate.getDate() + 7);
    }

    let futureDate = new Date(iterDate.getTime());
    futureDate.setMonth(futureDate.getMonth() + this.numMonths);
    let sunday =  new Date(iterDate.getTime());
    sunday.setDate(sunday.getDate() + (7 - this.dayOfWeek));
    //console.log(iterDate);
    //console.log(futureDate);

    while(iterDate < futureDate){
      let date1 = this.getDateString(iterDate);
      let date2 = this.getDateString(sunday);

      //console.log("DATE1: " + date1);
      //console.log("DATE2: " + date2);
      //console.log("MM: " + mm);
      //console.log("MM2: " + mm2);
      this.dateList.push(new DateList(date1, date2));
      iterDate.setDate(iterDate.getDate() + 7);
      sunday.setDate(sunday.getDate() + 7);

    }
  }

  getDateString(dat): string {
    let date1 = "";
    if(dat.getDate()>9) {
      if((dat.getMonth() + 1) > 9) {
        date1 = dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDate();
      }
      else{
        date1 = dat.getFullYear() + '-0' + (dat.getMonth() + 1) + '-' + dat.getDate();
      }
    }
    else{
      if((dat.getMonth() + 1) > 9) {
        date1 = dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-0' + dat.getDate();
      }
      else{
        date1 = dat.getFullYear() + '-0' + (dat.getMonth() + 1) + '-0' + dat.getDate();
      }
    }

    return date1;
  }

  parseJsonDate(jsonDateString){
    let d1 = new Date(jsonDateString);
    let year = d1.getFullYear();
    let month = d1.getMonth() + 1;
    let day = d1.getDate();
    let hours = d1.getHours();
    hours = (hours+24-2)%24;
    let minutes = d1.getMinutes();
    var mid='AM';
    if(hours==0){ //At 00 hours we need to show 12 am
      hours=12;
    }
    else if(hours>12)
    {
      hours=hours%12;
      mid='PM';
    }
    let returnDay = (day > 9) ? month + "/" + day + "/" + year: month + "/0" + day + "/" + year ;
    let returnTime = (minutes > 9) ? hours + ":" +  minutes  + " " +  mid: hours + ":0" +  minutes  + " " +  mid;
    let fullReturnDate = returnDay + " " + returnTime;
    return fullReturnDate;
  }

  buildChart(dest, remove){
    this.dates = this.dateList.map(function (a) {
      return a.departureDate
    });
    if(remove==1){
      this.options = {

        title: {
          text: 'Flights'
        },

        xAxis: {
          categories: this.dates
        },

        series: this.flightList.removeSeriesData(dest)
      };
    }
    if(remove==2){
      this.options = {

        title: {
          text: 'Flights'
        },

        xAxis: {
          categories: this.dates
        },

        series: this.flightList.updateSeriesData(dest)
      };
    }
    if(remove==3){
      this.options = {

        title: {
          text: 'Flights'
        },

        xAxis: {
          categories: this.dates
        },

        series: this.flightList.refreshSeriesData()
      };
    }

  }
  requestFlights(dest){

    this.dates = [];
    this.prices = [];

      for(let date of this.dateList){
        this.dataService.search(this.departures[0], dest, date.departureDate, date.returnDate)
        .subscribe(
          data => {
           this.flightList.addFlight(
              this.departures[0],
              dest,
              data["Quotes"][0]["MinPrice"],
              data["Carriers"][0]["Name"],
              this.parseJsonDate(data["Quotes"][0]["QuoteDateTime"]),
              date.departureDate,
              date.returnDate
           );
          //console.log(data);
          },
          err => console.log(err),
          () => {

            if(dest == this.destinations[this.destinations.length-1] && date == this.dateList[this.dateList.length-1]) {
              // console.log("THIS.DESTINATIONS");
              // console.dir(this.destinations);
              // console.log("THIS.DATELIST");
              // console.dir(this.dateList);
              this.buildChart(dest, 2);
            }
          }
        );
      }


  }

  refreshFlights(){
    this.flightList = new FlightList;
    this.dates = [];
    this.prices = [];
    for(let dest of this.destinations ){
      for(let date of this.dateList){
        // console.log(date.departureDate);
        // console.log(date.returnDate);
        this.dataService.search(this.departures[0], dest, date.departureDate, date.returnDate)
          .subscribe(
            data => {
              //departureAirport, arrivalAirport, price, airline, priceTime, departureTime
              this.flightList.addFlight(
                this.departures[0],
                dest,
                data["Quotes"][0]["MinPrice"],
                data["Carriers"][0]["Name"],
                this.parseJsonDate(data["Quotes"][0]["QuoteDateTime"]),
                date.departureDate,
                date.returnDate);

            },
            err => console.log(err),
            () => {
              console.log(dest);
              console.log(this.destinations[this.destinations.length-1])
              if(dest == this.destinations[this.destinations.length-1] && date == this.dateList[this.dateList.length-1]) {
                this.buildChart(dest, 3);
              }
            }
          );
      }
    }

  }

  // onSubmit(value: string): void{
  //   this.calculateDates();
  //   this.requestFlights();
  //   console.log(this.flightList);
  // }



  keypressHandler(event, newValue: string, isDest: boolean){
    this.create(newValue, isDest);

  }

  create(newValue: string, isDest:boolean){
    //console.log("CREATE ISDEST:" + isDest);
    if(isDest) {
      console.log("this dest" + this.destinations.length);
      console.log(this.destinations.length ==0 );
      this.destinations.push(newValue);
      if(this.destinations.length ==1 ){
        console.log("HEHEHE");
        this.requestFlights(newValue);
      }
      else{
        this.requestFlights(newValue);
      }
    }
    else{
      this.departures = [];
      if(this.destinations.length > 0){
        this.departures.push(newValue);
        this.refreshFlights();
      }
      else {
        this.departures.push(newValue);
      }
    }
  }

  remove(name: string, isDest:boolean) : void {
    //console.log("REMOVE ISDEST:" + isDest);
    if(isDest) {
      var index = this.destinations.indexOf(name, 0);
      if (index !== undefined) {
        this.destinations.splice(index, 1);
        console.log("HEreNOWDOJD");
        this.buildChart(name, 1);
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
