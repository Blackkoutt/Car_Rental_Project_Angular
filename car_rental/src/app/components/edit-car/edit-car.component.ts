import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';
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

    constructor(private carService:CarService){
      this.formModel = new FormGroup({
        manufacturer: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          CustomValidators.IsValueStartsWithUppercase(),
          CustomValidators.IsAlphanumericValue()]),
        model: new FormControl('',[
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.IsAlphanumericValue()
        ]),
        date_of_manufacture: new FormControl('',[
          Validators.required,
          CustomValidators.DateValidator()
          
        ]),
        available_count: new FormControl('',[
          Validators.required,
          Validators.min(0)
        ]),
        rental_cost: new FormControl('',[
          Validators.required,
          Validators.min(0),
          Validators.max(2000)
        ]),
        gearbox: new FormControl(''),
        type: new FormControl('',[
          Validators.required,
          CustomValidators.IsValueStartsWithUppercase(),
          CustomValidators.TypeValidator()
        ]),
        seats_count: new FormControl('',[
          Validators.required,
          Validators.min(2),
          Validators.max(7),
        ]),
      })
    }
    ngOnInit():void{
      this.formModel.get('seats_count')?.addValidators(
        CustomValidators.IsCorrectSeatsCount(this.formModel.get('type') as FormControl)
      )
      this.formModel.setValue(
        {
          manufacturer: this.car?.Manufacturer,
          model: this.car?.Model,
          date_of_manufacture: this.parseDate(this.car?.DateOfManufacture),
          available_count: this.car?.AvailableCount,
          rental_cost: this.car?.RentalCost,
          seats_count: this.car?.SeatsCount,
          gearbox: this.car?.GearBox ? "Automatyczna": "Manualna",
          type: this.car?.Type
        }
      )
    }
    parseDate(dateString?: string): string {
      const parts:string[]|undefined = dateString?.split('.');
      if(parts===undefined){
        return new Date().toISOString().split('T')[0];
      }
      // w JS miesiace liczone od 0 do 11
      return new Date(+parts[2], +parts[1] -1, +parts[0] + 1).toISOString().split('T')[0];
    }
    convertDateToDefaultFormat(date:string):string{
      const parts:string[] = date.split('-');
      return `${parts[2]}.${parts[1]}.${parts[0]}`
    }
    mapGearbox(gearbox:string){
      if(gearbox === "Automatyczna"){
        return true;
      }
      else{
        return false;
      }
    }
    get controls(){
      return this.formModel.controls;
    }
    updateCar(car:CarData){
      const formValues = this.formModel.value;
      Object.assign(car, {
        Manufacturer: formValues.manufacturer,
        Model: formValues.model,
        DateOfManufacture: this.convertDateToDefaultFormat(formValues.date_of_manufacture),
        AvailableCount: formValues.available_count,
        RentalCost: formValues.rental_cost,
        SeatsCount: formValues.seats_count,
        GearBox: this.mapGearbox(formValues.gearbox),
        Type: formValues.type
      });

      this.carService.updateCar(car).subscribe((car_update: CarData) => {
        this.carUpdated.emit(car_update); // Zamień car_update na [car_update]
     });
    }
}
