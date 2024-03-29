import { Injectable } from "@angular/core";
import { Reservation } from "../models/reservation";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { differenceInDays } from "date-fns";

@Injectable({
  providedIn: "root"
})
export class ReservationService {
  private url = "reservations";
  //private url = "reserve";
  constructor(private http: HttpClient) {}

  calculateTotalCost(startDate: Date, endDate: Date, dailyCost: number): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let bonus: number = 1;
          const daysDifference = differenceInDays(endDate, startDate);
          if (daysDifference >= 10) {
            bonus = 0.9;
          }
          if (daysDifference >= 5 && daysDifference < 10) {
            bonus = 0.95;
          }
          const totalCost = daysDifference * dailyCost * bonus;

          resolve(totalCost);
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }
  public getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.apiUrl}/${this.url}`);
  }
  public createReservation(reservation: Reservation): Observable<Reservation> {
    console.log("res from service: ", reservation);
    return this.http.post<Reservation>(`${environment.apiUrl}/${this.url}`, reservation);
  }

  public deleteReservation(reservation: Reservation): Observable<Reservation[]> {
    return this.http.delete<Reservation[]>(`${environment.apiUrl}/${this.url}/${reservation.Id}`);
  }
}
