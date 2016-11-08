import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class AirportService {

  constructor(public http: Http) { }

  search(){

    let apiUrl: string = "http://localhost:3000/api/get_airports";
    return this.http.get(apiUrl)
      .map(response => response.json());


  }
}
