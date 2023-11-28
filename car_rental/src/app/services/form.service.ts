import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CustomValidators from 'src/app/validators/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  createForm():FormGroup{
    return  new FormGroup({
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
