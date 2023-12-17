import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';
import { FormService } from 'src/app/services/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-reservation',
    templateUrl: `./add-reservation.component.html`,
    styleUrls: ['./add-reservation.component.css'],

})
export class AddReservationComponent {
    car:CarData|undefined;
    formModel:FormGroup;
    showErrors:boolean=false;
constructor(private route:ActivatedRoute, private reservationService:ReservationService,private carService:CarService, private formService:FormService, private router:Router){
    this.formModel = formService.createForm();
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
                          this.formModel.get('car_id')?.setValue(this.car?.Id)                       
            });   
        });
        
      }  

get controls(){
    return this.formModel.controls;
  }

  showPotentialErrors(){
    this.showErrors=true;
  }
  addReservation() {
    const formValues = this.formModel.value;
    this.reservationService.getNextId().subscribe((value)=>{
        const reservation:Reservation = new Reservation(
            value,
            formValues.car_id,
            formValues.name,
            formValues.surname,
            formValues.email,
            formValues.phoneNumber,
            this.formService.convertDateToDefaultFormat(formValues.start_of_reservation),
            this.formService.convertDateToDefaultFormat(formValues.end_of_reservation),
            formValues.total_cost
        )
        this.reservationService.createReservation(reservation).subscribe((add_reservation: Reservation)=>{
            console.log("Dodano rezerwacje: ",add_reservation);
        });
        this.router.navigate(['']);
    });
    }
}
