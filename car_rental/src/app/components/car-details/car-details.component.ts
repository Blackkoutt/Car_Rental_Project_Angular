import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  car:CarData|undefined;
  //Id:string|null = "";
  constructor(private route:ActivatedRoute, private carService:CarService){
   
  }
  ngOnInit() {
    let Id:number = 0;  
    this.route.paramMap.subscribe(params =>{
        Id = Number(params.get('id'));
        this.carService.getOneCar(Id).subscribe((result:any) => {
          this.car = new CarData(
                        result.id,
                        result.manufacturer,
                        result.model,
                        result.date_of_manufacture,
                        result.available_count,
                        result.rental_cost,
                        result.seats_count,
                        result.gearbox,
                        result.type
                      );
        });   
    });
    
  }

    
   
}

