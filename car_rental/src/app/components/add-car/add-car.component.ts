import { Component, ElementRef, Type, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarData } from 'src/app/models/car-data';
import { ManufacturerData } from 'src/app/models/manufacturer';
import { TypeData } from 'src/app/models/type';
import { CarService } from 'src/app/services/car.service';
import { FormService } from 'src/app/services/form.service';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  formModel:FormGroup;
  showErrors:boolean=false;
  manufacturers:ManufacturerData[] = [];
  types:TypeData[] = [];
  seats:number[] = [];
  type_names:string[] = [];

  constructor(private carService:CarService,
              private formService:FormService,
              private router:Router,
              private manufacturerService:ManufacturerService,
              private typeService: TypeService){
    this.formModel = formService.createForm();
  }
  ngOnInit(): void {
    this.manufacturerService.getManufacturers().subscribe((result: any[]) => {
      this.manufacturers = result.map((man: any) => {
            let manufacturer = new ManufacturerData({
              name: man.name
            })
            manufacturer.Id = man.id;
            return manufacturer;
        });
    });
    this.typeService.getTypes().subscribe((result: any[]) => {
      this.types = result.map((type: any) => {
            let newType = new TypeData({
              name: type.name,
              seats_count: type.seats_count
            })
            newType.Id = type.id;
            if(!this.seats.includes(newType.SeatsCount)){
              this.seats.push(newType.SeatsCount);
            }  
            if(!this.type_names.includes(newType.Name)){
              this.type_names.push(newType.Name);
            } 
            return newType;
        });
        this.seats.sort((a:number, b:number) => a - b);
    });
  }
  resetTypeSeatsAndNameControl(){
    this.type_names = Array.from(new Set(this.types.map(type => type.Name)));
    this.controls['type'].reset();
    this.seats = Array.from(new Set(this.types.map(type => type.SeatsCount)));
    this.seats.sort((a:number, b:number) => a - b);
    this.controls['seats_count'].reset();
  }
  onTypeSeatsChange(event:any){
    if(event.target.value===""){
      this.resetTypeSeatsAndNameControl();
    }
    else{
      let typeNames:string[] = this.types.filter(type => type.SeatsCount === Number(event.target.value)).map(type => type.Name);
      this.type_names = [...typeNames];
    }   
  }
  onTypeNameChange(event: any) {
    if(event.target.value===""){
      this.resetTypeSeatsAndNameControl();
    }
    else{
      let typeSeats:number[] = this.types.filter(type => type.Name === event.target.value).map(type => type.SeatsCount);
      this.seats = [...typeSeats];
      this.seats.sort((a:number, b:number) => a - b);
    }  
  }
  get controls(){
    return this.formModel.controls;
  }
  showPotentialErrors(){
    this.showErrors=true;
  }

  addCar(){
    const formValues = this.formModel.value;

    let type:TypeData|undefined = this.types.find(type=>(type.Name === formValues.type && type.SeatsCount === Number(formValues.seats_count)));

    const car:CarData = new CarData(
      {
        manufacturerId: Number(formValues.manufacturer),
        typeId: type?.Id, 
        model: formValues.model,
        date_of_manufacture: this.formService.convertDateForSaveToDb(formValues.date_of_manufacture),
        available_count: Number(formValues.available_count),
        rental_cost: Number(formValues.rental_cost),
        gearbox: this.formService.mapGearbox(formValues.gearbox)
      }
    )
      
    this.carService.createCar(car).subscribe((add_car: CarData) => {
      console.log("Dodany samochód: ",add_car);
      this.router.navigate(['']);
    });
  }
}
