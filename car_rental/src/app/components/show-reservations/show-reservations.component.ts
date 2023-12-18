import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
    selector: 'app-reservations-list',
    templateUrl: './show-reservations.component.html',
    styleUrls: ['./show-reservations.component.css']
  })
export class ShowReservationsComponent {
    reservations:Reservation[]=[];
    constructor(private reservationService:ReservationService){

    }
    ngOnInit(): void {
      this.reservationService.getReservations().subscribe((result: any[]) => {
        this.reservations = result.map((reservation: any) => {
          return new Reservation(
            reservation.reservation_id,
            reservation.car_id,
            reservation.name,
            reservation.surname,
            reservation.email,
            reservation.phoneNumber,
            reservation.start_of_reservation,
            reservation.end_of_reservation,
            reservation.total_cost,

          );
        });
        console.log(this.reservations[0]);
      });
    }
   /* updateReservations(reservation:Reservation){
        this.reservation.map(old_reservation=>{
          if(reservation.CarId===old_reservation.CarId){
            return reservation;
          }
          else{
            return old_reservation;
          }
        });
        this.carToEdit=undefined;
      }*/
 }
