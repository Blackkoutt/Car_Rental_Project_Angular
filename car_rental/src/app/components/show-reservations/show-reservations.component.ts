import { useAnimation } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { CarData } from "src/app/models/car-data";
import { ManufacturerData } from "src/app/models/manufacturer";
import { Reservation } from "src/app/models/reservation";
import { TypeData } from "src/app/models/type";
import { UserData } from "src/app/models/user";
import { ReservationService } from "src/app/services/reservation.service";

@Component({
  selector: "app-reservations-list",
  templateUrl: "./show-reservations.component.html",
  styleUrls: ["./show-reservations.component.css"]
})
export class ShowReservationsComponent {
  reservations: Reservation[] = [];
  @ViewChild("deleteDialog") deleteDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("successDialog") successDialog!: ElementRef<HTMLDialogElement>;
  isDetailsVisible = false;
  resDetails?: Reservation;
  constructor(private reservationService: ReservationService) {}
  ChangeDetailsVisibility(res: Reservation): void {
    this.resDetails = res;
    this.isDetailsVisible = true;
  }
  SetVisibility(value: boolean): void {
    this.isDetailsVisible = value;
  }
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((result: any[]) => {
      this.reservations = result.map((reservation: any) => {
        let res: Reservation = new Reservation({
          userId: reservation.userId,
          carId: reservation.carId,
          start_of_reservation: this.FormatDate(reservation.start_of_reservation),
          end_of_reservation: this.FormatDate(reservation.end_of_reservation),
          total_cost: reservation.total_cost
        });
        res.Id = reservation.id;
        res.Car = new CarData({
          manufacturerId: reservation.car.manufacturerId,
          typeId: reservation.car.typeId,
          model: reservation.car.model,
          date_of_manufacture: this.FormatDate(reservation.car.date_of_manufacture),
          available_count: reservation.car.available_count,
          rental_cost: reservation.car.rental_cost,
          gearbox: reservation.car.gearbox
        });
        res.Car.Id = reservation.car.id;
        res.Car.Manufacturer = new ManufacturerData({
          name: reservation.car.manufacturer.name
        });
        res.Car.Manufacturer.Id = reservation.car.manufacturer.id;
        res.Car.Type = new TypeData({
          name: reservation.car.type.name,
          seats_count: reservation.car.type.seats_count
        });
        res.Car.Type.Id = reservation.car.type.id;
        res.User = new UserData({
          name: reservation.user.name,
          surname: reservation.user.surname,
          email: reservation.user.email,
          phone_number: reservation.user.phone_number
        });
        res.User.Id = reservation.user.id;
        return res;
      });
    });
  }
  FormatDate(date: string): string {
    const originalDate: Date = new Date(date.split("T")[0]);

    const options: object = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate: string = new Intl.DateTimeFormat("pl-PL", options).format(originalDate);
    return formattedDate;
  }
  ShowDialog(res: Reservation) {
    const dialog = this.deleteDialog.nativeElement;
    const info = dialog.querySelector("p");
    if (info) {
      info.innerHTML = `Czy napewno chcesz anulować rezerwację samochodu:<br/>  ${res.Car?.Manufacturer?.Name} ${res.Car?.Model}<br/> w dniach:<br/> ${res.Start_of_reservation} - ${res.End_of_reservation}?`;
    }
    dialog.showModal();
    dialog.onreset = () => {
      dialog.close();
    };
    dialog.onsubmit = () => {
      this.DeleteReservation(res);
    };
  }
  DeleteReservation(res: Reservation) {
    this.reservationService.deleteReservation(res).subscribe({
      next: (response) => {
        console.log("Pomyślnie anulowano rezerwację:", response);
        this.reservations = this.reservations.filter((r) => r !== res);
        this.ShowSuccessOrExceptionDialog(
          `Pomyślnie anulowano rezerwację samochodu ${res.Car?.Manufacturer?.Name} ${res.Car?.Model}`
        );
      },
      error: (error) => {
        console.error("Błąd podczas usuwania samochodu:", error);
        this.ShowSuccessOrExceptionDialog("Wystąpił bład podczas anulowania rezerwacji");
      }
    });
  }
  ShowSuccessOrExceptionDialog(message: string) {
    const dialog = this.successDialog.nativeElement;
    const info = dialog.querySelector("p");
    if (info) {
      info.textContent = message;
    }

    dialog.showModal();
    setTimeout(() => {
      dialog.close();
    }, 1500);
  }
}
