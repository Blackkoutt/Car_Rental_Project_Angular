import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';
import { FormService } from 'src/app/services/form.service';
import * as CustomValidators from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit{
    @Input() car?:CarData;
    @Output() carUpdated = new EventEmitter<CarData>();
    formModel:FormGroup;
    add_car?:CarData;

    constructor(private carService:CarService, private formService:FormService){
      this.formModel = formService.createForm();
    }

    ngOnInit():void{
      this.formModel.get('seats_count')?.addValidators(
        CustomValidators.IsCorrectSeatsCount(this.formModel.get('type') as FormControl)
      )
      this.formService.setValuesIntoForm(this.formModel,this.car);     
    }
    
    get controls(){
      return this.formModel.controls;
    }
    updateCar(car?:CarData){
      if(car!==undefined){
        const formValues = this.formModel.value;
        Object.assign(car, {
          
          Manufacturer: formValues.manufacturer,
          Model: formValues.model,
          DateOfManufacture: this.formService.convertDateToDefaultFormat(formValues.date_of_manufacture),
          AvailableCount: formValues.available_count,
          RentalCost: formValues.rental_cost,
          SeatsCount: formValues.seats_count,
          GearBox: this.formService.mapGearbox(formValues.gearbox),
          Type: formValues.type
        });
  
        this.carService.updateCar(car).subscribe((car_update: CarData) => {
          this.carUpdated.emit(car_update);
       });
      }     
    }
}
