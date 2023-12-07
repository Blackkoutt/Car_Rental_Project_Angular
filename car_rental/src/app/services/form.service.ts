import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CustomValidators from 'src/app/validators/custom-validators';
import { CarData } from '../models/car-data';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  setValuesIntoForm(formModel:FormGroup,car?:CarData,):void{
    formModel.setValue(
      {
        manufacturer: car?.Manufacturer,
        model: car?.Model,
        date_of_manufacture: this.parseDate(car?.DateOfManufacture),
        available_count: car?.AvailableCount,
        rental_cost: car?.RentalCost,
        seats_count: car?.SeatsCount,
        gearbox: car?.GearBox ? "Automatyczna": "Manualna",
        type: car?.Type
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

  createForm():FormGroup{
    //return  
    return new FormGroup({
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
    //return formModel;
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
}
