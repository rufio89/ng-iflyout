import {Flight} from "./flight";
/**
 * Created by root on 11/16/16.
 */
export class FlightList {
  private flightList: Flight[];
  private seriesObjects: {name: string, data: number[]}[];

  constructor(){
    this.flightList = [];
    this.seriesObjects = [];
  }

  addFlight(departureAirport, arrivalAirport, price, airline, priceTime, departureTime){
    this.flightList.push(new Flight(departureAirport, arrivalAirport, price, airline, priceTime, departureTime));
  }

  getListByAirport(airportName): Flight[]{
    let currentList: Flight[];
    currentList = [];
    for(let flight of this.flightList){
      if(flight.arrivalAirport==airportName){
        currentList.push(flight);
      }
    }

    return currentList;
  }

  getSeriesData(): {name: string, data: number[]}[]{

    let destinations = this.getUniqueDestinations();
    console.log("destinations: " + destinations);
    for(let i= 0; i < destinations.length; i++){
      let aList = this.getListByAirport(destinations[i]);
      this.seriesObjects.push({name:aList[i].arrivalAirport, data: []});
      console.log("aList: " + aList);
      for(let j=0; j<aList.length; j++){
        this.seriesObjects[i].data.push(aList[j].price);
      }

    }

    return this.seriesObjects;
  }



  getUniqueDestinations(): string[]{
    console.log("FL:" + this.flightList);
    let flags = [], output = [], l = this.flightList.length, i;
    for( i=0; i<l; i++) {
      if( flags[this.flightList[i].arrivalAirport]) continue;
      flags[this.flightList[i].arrivalAirport] = true;
      output.push(this.flightList[i].arrivalAirport);
    }
    console.log("OUTPUT: " + output);
    return output;
  }

}
