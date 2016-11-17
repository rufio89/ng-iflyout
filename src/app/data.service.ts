import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(public http:Http) {

  }

  search = (departureAirport:string, arrivalAirport:string, departureDate:string, returnDate:string) => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'x-id');
    let apiURL: string = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/US/USD/EN/" + departureAirport + "/" + arrivalAirport + "/" + departureDate + "/" + returnDate + "?apiKey=if781234598447854911313432786612";
    return this.http.get(apiURL)
      .map(res => res.json());


  }






}
