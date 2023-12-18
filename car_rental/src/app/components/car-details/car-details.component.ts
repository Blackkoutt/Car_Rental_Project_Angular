import { Component, Input } from '@angular/core';
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
  @Input() car?:CarData;
  constructor(){
   
  }
  ngOnInit() {
    
  }
}

