import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class AirportService {
  //data: Object;
  constructor(public http: Http) {
    // let jsonFile: string = "./airports.json";
    // console.log(jsonFile);
    // return this.http.get(jsonFile)
    //   .map(response => response.json())
    //   .subscribe(data => this.data = data,
    //     err => console.log(err),
    //     () => console.log('Completed'));
  }


}
