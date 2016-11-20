import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class AirportService {

  constructor(public http: Http) { }

  search(){
    //https://54.213.227.211:3000/api/get_airports
    let apiUrl: string = "https://54.213.227.211:3000/api/get_airports";
    return this.http.get(apiUrl)
      .map(response => response.json());


  }
}
