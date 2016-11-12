import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class DataService {

  constructor(public http:Http) {

  }

  search(departureAirport:string, arrivalAirport:string, departureDate:string, returnDate:string){
    let apiURL: string = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/US/USD/EN/"+departureAirport+"/"+arrivalAirport+"/"+departureDate+"/"+returnDate+"?apiKey=if781234598447854911313432786612";

    return this.http.get(apiURL)
      .map(response => response.json());
  }

}