import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class DataService {

  constructor(public http:Http) {

  }

  search(departureAirport:string, arrivalAirport:string, departureDate:string, returnDate:string){
    let apiURL: string = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/US/USD/EN/"+departureAirport+"/"+arrivalAirport+"/"+departureDate+"/"+returnDate+"?apiKey=";

    return this.http.get(apiURL, { headers: new Headers({"Access-Control-Allow-Origin": "*"})})
      .map(response => response.json());
  }

}
