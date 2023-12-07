import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  showErrors:boolean=false;

  constructor(private carService:CarService, private formService:FormService, private router:Router){
    this.formModel = formService.createForm();
  }

  get controls(){
    return this.formModel.controls;
  }
  showPotentialErrors(){
    this.showErrors=true;
  }

  addCar(){
    const formValues = this.formModel.value;

    this.carService.getNextId().subscribe((value) => {
      const car:CarData = new CarData(
        value,
        formValues.manufacturer,
        formValues.model,
        this.formService.convertDateToDefaultFormat(formValues.date_of_manufacture),
        formValues.available_count,
        formValues.rental_cost,
        formValues.seats_count,
        this.formService.mapGearbox(formValues.gearbox),
        formValues.type
      )
      this.carService.createCar(car).subscribe((add_car: CarData) => {
        console.log("Dodany samochód: ",add_car);
      });
      this.router.navigate(['']);
    });
  }
}
