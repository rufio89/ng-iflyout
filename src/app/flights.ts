/**
 * Created by root on 11/16/16.
 */
export class Flights{
  price: number;
  airline: string;
  priceTime: string;
  departureAirport: string;
  arrivalAirport: string;



  constructor(price, airline, pt, da, aa){
    this.price = price;
    this.airline = airline;
    this.priceTime = pt;
    this.departureAirport = da;
    this.arrivalAirport = aa;
  }
}
