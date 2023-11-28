import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent {
  title = 'car_rental';
  searchValue:string='';
  searchCriteria:string='manufacturer';
  cars: CarData[] = [];
  carToEdit?:CarData;

  searchValueControl = new FormControl('',[Validators.minLength(3)]);
  searchCriteriaControl = new FormControl('manufacturer');

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
    this.searchCriteriaControl.valueChanges.subscribe(value=>{
      if(this.searchCriteriaControl.valid){
        if(value===null){
          this.searchCriteria='manufacturer';
        }
        else{
          this.searchCriteria=value;
        }
      }
      else{
        this.searchCriteria='manufacturer';
      }
    })

    this.searchValueControl.valueChanges.subscribe(value=>{
      if(this.searchValueControl.valid){
        if(value===null){
          this.searchValue='';
        }
        else{
          this.searchValue=value;
        }
      }
      else{
        this.searchValue='';
      }
    })
  }
  DeleteCar(car:CarData){
    console.log("tu");
    this.carService.deleteCar(car).subscribe({
      next: response => {
        console.log('Usunięto samochód pomyślnie:', response);
        this.cars = this.cars.filter(c => c !== car);
      },
      error: error => {
        console.error('Błąd podczas usuwania samochodu:', error);
      }
    });
  }
  editCar(event:CarData|undefined){
    this.carToEdit=event;
  }
  updateCarsList(car:CarData){
    this.cars.map(old_car=>{
      if(car.Id===old_car.Id){
        return car;
      }
      else{
        return old_car;
      }
    });
    this.carToEdit=undefined;
  }
}
