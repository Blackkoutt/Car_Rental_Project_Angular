import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from "@angular/forms";
import * as CustomValidators from "src/app/validators/custom-validators";
import { CarData } from "../models/car-data";
import { Reservation } from "../models/reservation";

@Injectable({
  providedIn: "root"
})
export class FormService {
  constructor() {}

  setValuesIntoForm(formModel: FormGroup, car?: CarData): void {
    formModel.setValue({
      manufacturer: car?.Manufacturer?.Id,
      model: car?.Model,
      date_of_manufacture: this.parseDate(car?.DateOfManufacture),
      available_count: car?.AvailableCount,
      rental_cost: car?.RentalCost,
      seats_count: car?.Type?.SeatsCount,
      gearbox: car?.GearBox ? "Automatyczna" : "Manualna",
      type: car?.Type?.Name
    });
  }
  setInitialValuesReservationInfoForm(formModel: FormGroup, total_cost?: number) {
    console.log("initial values");
    formModel.setValue({
      name: "",
      surname: "",
      email: "",
      phoneNumber: "78878",
      start_of_reservation: this.formatDateForInput(new Date()),
      end_of_reservation: new Date(),
      total_cost: total_cost,
      pdf_file: ""
    });
  }
  setReservationValuesIntoForm(formModel: FormGroup, reservation?: Reservation): void {
    formModel.setValue({
      car_id: reservation?.CarId,
      name: reservation?.User?.Name,
      surname: reservation?.User?.Surname,
      email: reservation?.User?.Email,
      phoneNumber: reservation?.User?.PhoneNumber,
      start_of_reservation: this.parseDate(reservation?.Start_of_reservation),
      end_of_reservation: this.parseDate(reservation?.End_of_reservation),
      total_cost: reservation?.Total_Cost
    });
  }
  formatDateForInput(date: Date) {
    let dateString: string = new Intl.DateTimeFormat().format(date);
    dateString = dateString.split(".").reverse().join("-");

    return dateString;
  }
  parseDate(dateString?: string): string {
    console.log("date", dateString);
    const parts: string[] | undefined = dateString?.split(".");
    if (parts === undefined) {
      return new Date().toISOString().split("T")[0];
    }
    // w JS miesiace liczone od 0 do 11
    return new Date(+parts[2], +parts[1] - 1, +parts[0] + 1).toISOString().split("T")[0];
  }
  createManufacturerForm(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [
        Validators.required,
        CustomValidators.IsValueStartsWithUppercase(),
        CustomValidators.IsAlphanumericValue()
      ])
    });
  }
  createForm(): FormGroup {
    //return
    return new FormGroup({
      manufacturer: new FormControl("", [Validators.required]),
      model: new FormControl("", [Validators.required, Validators.maxLength(50), CustomValidators.IsAlphanumericValue()]),
      date_of_manufacture: new FormControl("", [Validators.required, CustomValidators.DateValidator()]),
      available_count: new FormControl("", [Validators.required, Validators.min(0)]),
      rental_cost: new FormControl("", [Validators.required, Validators.min(0), Validators.max(2000)]),
      gearbox: new FormControl(""),
      type: new FormControl("", [Validators.required, CustomValidators.IsValueStartsWithUppercase(), CustomValidators.TypeValidator()]),
      seats_count: new FormControl("", [Validators.required, Validators.min(2), Validators.max(7)])
    });
  }
  createFormReservation(): FormGroup {
    //return
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.maxLength(50), CustomValidators.IsValueStartsWithUppercase()]),
      surname: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        CustomValidators.IsValueStartsWithUppercase(),
        CustomValidators.IsAlphanumericValue()
      ]),
      email: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.email]),
      phoneNumber: new FormControl("", [Validators.required, CustomValidators.ValidatePhoneNumber()]),

      start_of_reservation: new FormControl("", [Validators.required, CustomValidators.StartDateValidator()]),
      end_of_reservation: new FormControl("", [Validators.required, CustomValidators.endOfReservationValidator.bind(this)]),
      total_cost: new FormControl("", [Validators.required, Validators.min(0), Validators.max(20000)]),
      pdf_file: new FormControl("", [Validators.required])
    });
    //return formModel;
  }
  convertDateToDefaultFormat(date: string): string {
    const parts: string[] = date.split("-");
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }

  convertDateForSaveToDb(date: string): string {
    const newDate: Date = new Date(`${date}T00:00:00.000Z`);

    return newDate.toISOString();
  }

  mapGearbox(gearbox: string) {
    if (gearbox === "Automatyczna") {
      return true;
    } else {
      return false;
    }
  }
}
