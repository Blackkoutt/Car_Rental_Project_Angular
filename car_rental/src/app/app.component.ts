import { Component } from '@angular/core';
import { CarData } from './models/car-data';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'car_rental';
  cars: CarData[] = [];

  constructor(private carService:CarService){

  }
  ngOnInit(): void {
    this.carService.getCars().subscribe((result: any[]) => {
      this.cars = result.map((carData: any) => {
        return new CarData(
          carData.id,
          carData.manufacturer,
          carData.model,
          carData.date_of_manufacture,
          carData.available_count,
          carData.rental_cost,
          carData.seats_count,
          carData.gearbox,
          carData.type
        );
      });
      console.log(this.cars[0]);
      console.log(this.cars[0].Manufacturer);
    });
  }
}
