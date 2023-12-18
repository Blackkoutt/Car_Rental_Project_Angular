import { AbstractControl, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function IsValueStartsWithUppercase(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    
    const startsWithUppercaseRegEx:RegExp = /^[A-ZĄĆĘŁŃÓŚŹŻ]/;

    const startsWithUppercase:boolean = startsWithUppercaseRegEx.test(value);

    return startsWithUppercase ? null : {startsWithUppercase: true }

  }
}
export function IsAlphanumericValue(): ValidatorFn {
  return (control: AbstractControl) => {
    const value: string = control.value;

    const alphanumericRegEx:RegExp = /^[a-zA-Z0-9\s]+$/;

    const hasOnlyAlphanumeric:boolean = alphanumericRegEx.test(value);

    return hasOnlyAlphanumeric? null : {hasOnlyAlphanumeric:true};
  }
}

export function IsCorrectSeatsCount(typeControl:FormControl): ValidatorFn {
  return (control: AbstractControl) => {
    const seatsValue = +control.value;

    const allowedSeats: number[] = GetAllowedSeats(typeControl.value);

    const isCorrectSeatsCount: boolean = allowedSeats.includes(seatsValue);

    return isCorrectSeatsCount ? null : { CorrectSeatsCount: true }

  }
}
function GetAllowedSeats(type: string): number[] {
  switch (type) {
    case 'SUV':
      return [4, 5, 6, 7];
    case 'Coupe':
      return [2, 4];
    case 'Kabriolet':
      return [2, 4, 5];
    case 'Kompakt':
      return [2, 4, 5]
    case 'Mini Van':
      return [3, 4, 5];
    case 'Van':
      return [6, 7];
    case 'Sedan':
      return [4, 5];
    case 'Hatchback':
      return [4, 5];
    case 'Kombi':
      return [5];
    default:
      return [];
  }
}
export function TypeValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const types:string[] = ["SUV", "Coupe", "Kabriolet", "Kompakt", "Mini Van", "Van", "Sedan", "Hatchback", "Kombi"];
    const value: string = control.value;

    const isValidType:boolean = types.includes(value);

    return isValidType ? null : { validType: true };
  }
}
export function DateValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value: string = control.value;

    const inputDate = new Date(value);

    const minDate = new Date('2010-01-01');
    const maxDate = new Date();

    return (inputDate >= minDate && inputDate <= maxDate) ? null : { validDate: true }
  }
}
export function StartDateValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value: string = control.value;

    const inputDate = new Date(value);

    const currentDate = new Date();

    const isValid = inputDate > currentDate;

    console.log('Validation Result:', isValid);

    return isValid ? null : { validStartDate: true };
  }
}
export function NineDigitValidator(): ValidatorFn {
  return (control: AbstractControl)=> {
   
    const value: number = control.value;

    // Sprawdź, czy wartość ma dokładnie 9 cyfr
    const isValid = /^\d{9}$/.test(String(value));

    return isValid ? null : { nineDigit: true};
  };
}
export function endOfReservationValidator(control: AbstractControl): ValidationErrors | null {
  const startOfReservation = control.root?.get('start_of_reservation')?.value;
  const endOfReservation = control.value;

  if (startOfReservation && endOfReservation && endOfReservation < startOfReservation) {
      return { invalidEndDate: true };
  }

  return null;
}


