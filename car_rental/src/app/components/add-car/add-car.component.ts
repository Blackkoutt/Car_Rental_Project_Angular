import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  formModel:FormGroup;

  constructor(private carService:CarService, private formService:FormService){
    this.formModel = formService.createForm();
  }

  get controls(){
    return this.formModel.controls;
  }

  addCar(){
    const formValues = this.formModel.value;
    let newId:number=1;
    const getNextIdPromise = new Promise<number>((resolve, reject) => {
      this.carService.getNextId().subscribe({
        next: (nextValue) => {
          newId = nextValue;
          resolve(newId);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
    
    getNextIdPromise.then((resolvedId) => {
      //console.log('Nowe ID:', resolvedId);
      const car:CarData = new CarData(
        newId,
        formValues.manufacturer,
        formValues.model,
        this.formService.convertDateToDefaultFormat(formValues.date_of_manufacture),
        formValues.available_count,
        formValues.rental_cost,
        formValues.seats_count,
        this.formService.mapGearbox(formValues.gearbox),
        formValues.type
      )
        console.log(car);
      this.carService.createCar(car).subscribe((add_car: CarData) => {
          console.log(add_car);
        //this.carUpdated.emit(car_update); // Zamień car_update na [car_update]
      });   
    });
    
  }
}
