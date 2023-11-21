import { Component } from '@angular/core';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent {
  title = 'car_rental';
  cars: CarData[] = [];
  carToEdit?:CarData;

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
  editCar(car:CarData){
    this.carToEdit=car;
  }
  updateCarsList(car:CarData){
    //this.cars = cars;
    this.cars.map(old_car=>{
      if(car.Id===old_car.Id){
        return car;
      }
      else{
        return old_car;
      }
    })
  }
}
