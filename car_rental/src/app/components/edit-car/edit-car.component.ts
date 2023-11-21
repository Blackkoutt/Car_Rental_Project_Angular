import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit{
    @Input() car?:CarData;
    @Output() carUpdated = new EventEmitter<CarData>();

    constructor(private carService:CarService){
    }
    ngOnInit():void{
    }
    updateCar(car:CarData){
      /*console.log(car);
      //create tak samo tylko ze createCar
      this.carService.updateCar(car).subscribe((car_update:CarData)=>this.carUpdated.emit(car_update));*/
      console.log(car);
      this.carService.updateCar(car).subscribe((car_update: CarData) => {
        this.carUpdated.emit(car_update); // Zamień car_update na [car_update]
     });
    }
}
