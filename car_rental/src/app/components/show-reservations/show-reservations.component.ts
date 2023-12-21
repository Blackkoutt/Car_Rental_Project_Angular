import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
    selector: 'app-reservations-list',
    templateUrl: './show-reservations.component.html',
    styleUrls: ['./show-reservations.component.css']
  })
export class ShowReservationsComponent {
    reservations:Reservation[]=[];
    @ViewChild('deleteDialog') deleteDialog!: ElementRef<HTMLDialogElement>;
    @ViewChild('successDialog') successDialog!: ElementRef<HTMLDialogElement>;
    constructor(private reservationService:ReservationService){

    }
    ngOnInit(): void {
      this.reservationService.getReservations().subscribe((result: any[]) => {
        this.reservations = result.map((reservation: any) => {
          return new Reservation(
            reservation.id,
            reservation.car_id,
            reservation.name,
            reservation.surname,
            reservation.email,
            reservation.phoneNumber,
            reservation.start_of_reservation,
            reservation.end_of_reservation,
            reservation.total_cost,

          );
        }
        );
        console.log(this.reservations[0]);
      });
    }
    ShowDialog(res:Reservation){
      const dialog = this.deleteDialog.nativeElement;
      const info = dialog.querySelector('p');
      if (info) {
        info.textContent = `Czy napewno chcesz anulować reserwację o ID ${res.ReservationId} w dniach ${res.Start_of_reservation} - ${res.End_of_reservation}?`;
      }
      dialog.showModal();
      dialog.onreset=()=>{
        dialog.close();
      }
      dialog.onsubmit=()=>{
        this.DeleteReservation(res);
      }
    }
    DeleteReservation(res:Reservation){
      this.reservationService.deleteReservation(res).subscribe({
        next: response => {
          console.log('Pomyślnie anulowano rezerwację:', response);
          this.reservations = this.reservations.filter(r => r !== res);
          this.ShowSuccessOrExceptionDialog(`Pomyślnie anulowano rezerwację o ID ${res.ReservationId}`);
        },
        error: error => {
          console.error('Błąd podczas usuwania samochodu:', error);
          this.ShowSuccessOrExceptionDialog("Wystąpił bład podczas anulowania rezerwacji");
        }
      });
    }
    ShowSuccessOrExceptionDialog(message:string){
      const dialog = this.successDialog.nativeElement;
      const info = dialog.querySelector('p');
      if (info) {
        info.textContent = message;
      }
      
      dialog.showModal();
      setTimeout(()=>{
        dialog.close();
      }, 1500);
    }
 }
