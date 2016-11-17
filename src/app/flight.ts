/**
 * Created by root on 11/16/16.
 */
export class Flight{
  price: number;
  airline: string;
  priceTime: string;
  departureDate: string;
  departureAirport: string;
  arrivalAirport: string;

  constructor(departureAirport, arrivalAirport, price, airline, priceTime, departureTime){
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.price = price;
    this.airline = airline;
    this.priceTime = priceTime;
    this.departureDate = departureTime;


  }


}
