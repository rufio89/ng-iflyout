import { Injectable } from '@angular/core';
import {Http, Headers, Jsonp} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs';

@Injectable()
export class DataService {

  constructor(public http:Http, public jsonp: Jsonp) {

  }

  search = (departureAirport:string, arrivalAirport:string, departureDate:string, returnDate:string) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/jsonp');
    let apiURL: string = "http://partners.api.skyscanner.net/apiservices/xd/browsedates/v1.0/US/USD/EN/" + departureAirport + "/" + arrivalAirport + "/" + departureDate + "/" + returnDate + "?apiKey=if781234598447854911313432786612&dataType=jsonp&callback=JSONP_CALLBACK";
    return this.jsonp.get(apiURL, {headers: headers})
      .map(res => res.json())


  }






}
