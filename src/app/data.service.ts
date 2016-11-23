import { Injectable } from '@angular/core';
import {Http, Headers, Jsonp} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {DateList} from "./datelist";

@Injectable()
export class DataService {
  private data = [];
  constructor(public http:Http, public jsonp: Jsonp) {

  }

  search = (dateList: DateList[],  departureAirport:string, arrivalAirport:string, destinations = [], isRemoval: boolean) => {
    this.data = [];
    let headers = new Headers();
    headers.append('Content-Type', 'application/jsonp');
    let apiURL: string = "";
    if(!isRemoval) {
      for (let date of dateList) {
        apiURL = "http://partners.api.skyscanner.net/apiservices/xd/browsedates/v1.0/US/USD/EN/" + departureAirport + "/" + arrivalAirport + "/" + date.departureDate + "/" + date.returnDate + "?apiKey=if781234598447854911313432786612&dataType=jsonp&callback=JSONP_CALLBACK";
        this.data.push(this.jsonp.get(apiURL, {headers: headers}).map(res => res.json()));
      }
    }
    else{
      console.log("Destinations in data: " + destinations);
      console.log("IsRemoval: " + isRemoval);
      for(let dest of destinations ) {
        for (let date of dateList) {
          apiURL = "http://partners.api.skyscanner.net/apiservices/xd/browsedates/v1.0/US/USD/EN/" + departureAirport + "/" + dest + "/" + date.departureDate + "/" + date.returnDate + "?apiKey=if781234598447854911313432786612&dataType=jsonp&callback=JSONP_CALLBACK";
          this.data.push(this.jsonp.get(apiURL, {headers: headers}).map(res => res.json()));

        }
      }
    }
    console.log("This data");
    console.dir(this.data);
    return this.data;

  }






}
