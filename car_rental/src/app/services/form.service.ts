import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import * as CustomValidators from 'src/app/validators/custom-validators';
import { CarData } from '../models/car-data';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  setValuesIntoForm(formModel:FormGroup,car?:CarData):void{
    formModel.setValue(
      {
        manufacturer: car?.Manufacturer,
        model: car?.Model,
        date_of_manufacture: this.parseDate(car?.DateOfManufacture),
        available_count: car?.AvailableCount,
        rental_cost: car?.RentalCost,
        seats_count: car?.SeatsCount,
        gearbox: car?.GearBox ? "Automatyczna": "Manualna",
        type: car?.Type,
      }
    )
  }
  setReservationValuesIntoForm(formModel:FormGroup,reservation?:Reservation):void{
  formModel.setValue(
  {
    car_id: reservation?.CarId,
    name: reservation?.Name,
    surname: reservation?.Surname,
    email: reservation?.Email,
    phoneNumber: reservation?.PhoneNumber,
    start_of_reservation: this.parseDate(reservation?.Start_of_reservation),
    end_of_reservation: this.parseDate(reservation?.End_of_reservation),
    total_cost: reservation?.Total_Cost,
  }
  )
}
  
  parseDate(dateString?: string): string {
    const parts:string[]|undefined = dateString?.split('.');
    if(parts===undefined){
      return new Date().toISOString().split('T')[0];
    }
    // w JS miesiace liczone od 0 do 11
    return new Date(+parts[2], +parts[1] -1 , +parts[0] +1).toISOString().split('T')[0];
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
    },);
  }
    createFormReservation():FormGroup{
      //return  
      return new FormGroup({
        name: new FormControl('',[
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.IsValueStartsWithUppercase(),
        ]),
        surname: new FormControl('',[
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.IsValueStartsWithUppercase(),
          CustomValidators.IsAlphanumericValue()
        ]),
        email: new FormControl('',[
          Validators.required,
          Validators.maxLength(50),
          Validators.email
        ]),
        phoneNumber: new FormControl('',[
          Validators.required,
          CustomValidators.NineDigitValidator()
        ]),
        car_id: new FormControl('',[
          Validators.required
        ]),
        start_of_reservation: new FormControl('',[
          Validators.required,
          CustomValidators.StartDateValidator()
        ]),
        end_of_reservation: new FormControl('',[
          Validators.required, 
          CustomValidators.endOfReservationValidator.bind(this)              
        ]),
        total_cost: new FormControl('',[
          Validators.required,
          Validators.min(0),
          Validators.max(20000)
        ]),
        
      });
    //return formModel;
  }
  convertDateToDefaultFormat(date:string):string{
    const parts:string[] = date.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`
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

