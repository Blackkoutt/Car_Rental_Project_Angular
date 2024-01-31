import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CarData } from "src/app/models/car-data";
import { ManufacturerData } from "src/app/models/manufacturer";
import { TypeData } from "src/app/models/type";
import { CarService } from "src/app/services/car.service";
import { FormService } from "src/app/services/form.service";
import { ManufacturerService } from "src/app/services/manufacturer.service";
import { TypeService } from "src/app/services/type.service";
import * as CustomValidators from "src/app/validators/custom-validators";

@Component({
  selector: "app-edit-car",
  templateUrl: "./edit-car.component.html",
  styleUrls: ["./edit-car.component.css"]
})
export class EditCarComponent implements OnInit {
  @Input() car?: CarData;
  @Output() carUpdated = new EventEmitter<CarData>();
  manufacturers: ManufacturerData[] = [];
  formModel: FormGroup;
  add_car?: CarData;
  types: TypeData[] = [];
  seats: number[] = [];
  type_names: string[] = [];

  constructor(
    private carService: CarService,
    private formService: FormService,
    private manufacturerService: ManufacturerService,
    private typeService: TypeService
  ) {
    this.formModel = formService.createForm();
  }

  ngOnInit(): void {
    this.formModel
      .get("seats_count")
      ?.addValidators(CustomValidators.IsCorrectSeatsCount(this.formModel.get("type") as FormControl));
    this.manufacturerService.getManufacturers().subscribe((result: any[]) => {
      this.manufacturers = result.map((man: any) => {
        let manufacturer = new ManufacturerData({
          name: man.name
        });
        manufacturer.Id = man.id;
        return manufacturer;
      });
    });
    this.typeService.getTypes().subscribe((result: any[]) => {
      this.types = result.map((type: any) => {
        let newType = new TypeData({
          name: type.name,
          seats_count: type.seats_count
        });
        newType.Id = type.id;
        if (!this.seats.includes(newType.SeatsCount)) {
          this.seats.push(newType.SeatsCount);
        }
        if (!this.type_names.includes(newType.Name)) {
          this.type_names.push(newType.Name);
        }
        return newType;
      });
      this.seats.sort((a: number, b: number) => a - b);
    });
    this.formService.setValuesIntoForm(this.formModel, this.car);
  }

  get controls() {
    return this.formModel.controls;
  }
  resetTypeSeatsAndNameControl() {
    this.type_names = Array.from(new Set(this.types.map((type) => type.Name)));
    this.controls["type"].reset();
    this.seats = Array.from(new Set(this.types.map((type) => type.SeatsCount)));
    this.seats.sort((a: number, b: number) => a - b);
    this.controls["seats_count"].reset();
  }
  onTypeSeatsChange(event: any) {
    if (event.target.value === "") {
      this.resetTypeSeatsAndNameControl();
    } else {
      let typeNames: string[] = this.types
        .filter((type) => type.SeatsCount === Number(event.target.value))
        .map((type) => type.Name);
      this.type_names = [...typeNames];
    }
  }
  onTypeNameChange(event: any) {
    if (event.target.value === "") {
      this.resetTypeSeatsAndNameControl();
    } else {
      let typeSeats: number[] = this.types
        .filter((type) => type.Name === event.target.value)
        .map((type) => type.SeatsCount);
      this.seats = [...typeSeats];
      this.seats.sort((a: number, b: number) => a - b);
    }
  }
  updateCar(car?: CarData) {
    if (car !== undefined) {
      const formValues = this.formModel.value;
      let type: TypeData | undefined = this.types.find(
        (type) => type.Name === formValues.type && type.SeatsCount === Number(formValues.seats_count)
      );

      Object.assign(car, {
        manufacturerId: Number(formValues.manufacturer), // to trzeba potem zmienić
        typeId: type?.Id, // to też
        model: formValues.model,
        date_of_manufacture: this.formService.convertDateForSaveToDb(formValues.date_of_manufacture),
        available_count: Number(formValues.available_count),
        rental_cost: Number(formValues.rental_cost),
        gearbox: this.formService.mapGearbox(formValues.gearbox)
      });
      car.Manufacturer = undefined;
      car.Type = undefined;

      this.carService.updateCar(car).subscribe((car_update: CarData) => {
        this.carUpdated.emit(car_update);
      });
    }
  }
}
