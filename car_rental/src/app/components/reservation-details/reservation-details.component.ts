import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent {
  @Input() res?:Reservation;
  @Output() visibility = new EventEmitter<boolean>();
  constructor(){}
  ngOnInit() {
    
  }
  BackFromDetails(){
    this.visibility.emit(false);
  }
}
