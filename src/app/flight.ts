/**
 * Created by root on 11/16/16.
 */
export class Flight{
  departureAirport: string;
  arrivalAirport: string;
  price: number;
  airline: string;
  priceTime: string;
  departureDate: string;
  returnDate: string;
  url: string;

  constructor(departureAirport, arrivalAirport, price, airline, priceTime, departureDate, returnDate, url){
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.price = price;
    this.airline = airline;
    this.priceTime = priceTime;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
    this.url = url;

  }


}
