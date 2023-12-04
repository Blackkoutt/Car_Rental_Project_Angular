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
    showErrors:boolean=false;
    isAdd: boolean = false;

    constructor(private carService:CarService, private formService:FormService, private route: ActivatedRoute, private router: Router){
      this.formModel = formService.createForm();
      this.route.paramMap.subscribe(params => this.isAdd = Boolean(params.get('is_add')));
      console.log("add",this.isAdd);
    }

    ngOnInit():void{
      this.formModel.get('seats_count')?.addValidators(
        CustomValidators.IsCorrectSeatsCount(this.formModel.get('type') as FormControl)
      )
      if(!this.isAdd)
      {
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
      
    }
    parseDate(dateString?: string): string {
      const parts:string[]|undefined = dateString?.split('.');
      if(parts===undefined){
        return new Date().toISOString().split('T')[0];
      }
      // w JS miesiace liczone od 0 do 11
      return new Date(+parts[2], +parts[1] -1, +parts[0] + 1).toISOString().split('T')[0];
    }
    
    
    get controls(){
      return this.formModel.controls;
    }
    addCar(){
      const formValues = this.formModel.value;
      console.log("here");
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
        });
        this.router.navigate(['']);
      });     
    }
    showPotentialErrors(){
      this.showErrors=true;
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
