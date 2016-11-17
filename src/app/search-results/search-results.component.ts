import {Component, Input} from '@angular/core';
import {Flight} from "../flight";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent  {
  @Input() flightList : Flight[];
  @Input() options: Object;

  constructor() {


  }

}
