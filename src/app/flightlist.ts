import {Flight} from "./flight";
/**
 * Created by root on 11/16/16.
 */
export class FlightList {
  private flightList: Flight[];
  private seriesObjects: {name: string, color: string, data: {y: number, url: string, airline: string, destination: string, departureDate:string }[]}[];
  private colors : string[];

  constructor(){
    this.flightList = [];
    this.seriesObjects = [];
    this.colors = ["#B03060","#FE9A76","#FFD700","#32CD32","#016936","#008080","#0E6EB8", "#EE82EE", "#B413EC", "#FF1493", "#A52A2A", "#A0A0A0", "#000000"];
  }

  addFlight(departureAirport, arrivalAirport, price, airline, priceTime, departureDate, returnDate, url){
    this.flightList.push(new Flight(departureAirport, arrivalAirport, price, airline, priceTime, departureDate, returnDate, url));
  }


  getListByAirport(airportName): Flight[]{
    let currentList: Flight[];
    currentList = [];
    for(let flight of this.flightList){
      if(flight.arrivalAirport==airportName){
        currentList.push(flight);
      }
    }
    currentList.sort(function(a,b){
      return new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();
    });
    return currentList;
  }



  updateSeriesData(destination): {name: string, data: {y: number, url: string, airline:string, destination:string, departureDate:string }[]}[]{
      let aList = this.getListByAirport(destination);
      let rColor = this.colors[Math.floor(Math.random() * (this.colors.length))];
      this.colors.splice(this.colors.indexOf(rColor),1);


      this.seriesObjects.push({name: destination, color: rColor, data: []});

      for(let j=0; j<aList.length; j++){
        this.seriesObjects[this.seriesObjects.length-1].data.push({y:aList[j].price, url:aList[j].url, airline:aList[j].airline, destination: aList[j].arrivalAirport, departureDate: aList[j].departureDate});
      }
    console.dir(this.seriesObjects);
    return this.seriesObjects;
  }

  refreshSeriesData(): {name: string, data: {y: number, url: string, airline: string, destination:string, departureDate:string }[]}[]{
    this.seriesObjects = [];
    let destinations = this.getUniqueDestinations();
    console.log(destinations);
    for(let i= 0; i < destinations.length; i++){
      let aList = this.getListByAirport(destinations[i]);
      this.seriesObjects.push({name:aList[i].arrivalAirport,color: this.colors[Math.floor(Math.random() * (this.colors.length))], data: []});

      for(let j=0; j<aList.length; j++){
        this.seriesObjects[i].data.push({y:aList[j].price, url:aList[j].url, airline:aList[j].airline, destination: aList[j].arrivalAirport, departureDate: aList[j].departureDate});
      }

    }
    console.dir(this.seriesObjects);
    return this.seriesObjects;
  }

  removeSeriesData(destination): {name: string, data: {y: number, url: string, airline:string, destination:string }[]}[]{
    this.seriesObjects = this.seriesObjects.filter(function(el){
      return el.name!=destination;
    });

    return this.seriesObjects;
  }


  getUniqueDestinations(): string[]{
    let flags = [], output = [], l = this.flightList.length, i;
    console.log("This flightlist unique");
    console.dir(this.flightList);
    for( i=0; i<l; i++) {
      if( flags[this.flightList[i].arrivalAirport]) continue;
      flags[this.flightList[i].arrivalAirport] = true;
      output.push(this.flightList[i].arrivalAirport);
    }
    return output;
  }

}
