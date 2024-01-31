import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CarData } from "src/app/models/car-data";
import { Reservation } from "src/app/models/reservation";
import { CarService } from "src/app/services/car.service";
import { FormService } from "src/app/services/form.service";
import { ReservationService } from "src/app/services/reservation.service";
import { ActivatedRoute } from "@angular/router";
import { combineLatest } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { UserData } from "src/app/models/user";
import { PdfService } from "src/app/services/pdf.service";
import { differenceInDays } from "date-fns";

@Component({
  selector: "app-add-reservation",
  templateUrl: "./add-reservation.component.html",
  styleUrls: ["./add-reservation.component.css"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddReservationComponent implements OnInit {
  user: UserData | undefined;
  car: CarData | undefined;
  formModel: FormGroup;
  showErrors: boolean = false;
  downloadButtonVisible: boolean = false;
  manufacturerName: string | undefined;
  totalCost: number | undefined;
  downloadLink: string | undefined;
  discountMessage: string = "";
  actualDiscountMessage: string = "";
  private dateSubscription: Subscription | undefined;
  private startDate: Date | undefined;
  private endDate: Date | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private carService: CarService,
    private formService: FormService,
    private userService: UserService,
    private reservationService: ReservationService,
    private router: Router,
    private pdfService: PdfService
  ) {
    this.formModel = formService.createFormReservation();
  }

  ngOnInit() {
    let Id: number = 0;
    this.route.paramMap.subscribe((params) => {
      Id = Number(params.get("id"));
      this.carService.getOneCar(Id).subscribe((result: any) => {
        this.car = new CarData({
          manufacturerId: result.manufacturerId,
          typeId: result.typeId,
          model: result.model,
          date_of_manufacture: result.date_of_manufacture,
          available_count: result.available_count,
          rental_cost: result.rental_cost,
          gearbox: result.gearbox
        });
        this.car.Id = result.id;
        this.manufacturerName = result.manufacturer.name;
        //this.downloadReservationPdf();

        // Jeśli trzeba to można tu ustawić wszystko pozostałe
        //this.formModel.get("car_id")?.setValue(this.car?.Id);
        this.formService.setInitialValuesReservationInfoForm(this.formModel, this.car?.RentalCost);
      });
    });

    this.dateSubscription = this.formModel.get("end_of_reservation")?.valueChanges.subscribe((value) => {
      this.endDate = value;
      this.isUserHaveDiscount();
      this.calculateTotalCost(this.startDate, this.endDate);
    });
    this.dateSubscription = this.formModel.get("start_of_reservation")?.valueChanges.subscribe((value) => {
      this.startDate = value;
      this.isUserHaveDiscount();
      this.calculateTotalCost(this.startDate, this.endDate);
    });

    // Subskrybuj zmiany daty początkowej i końcowej
  }

  isUserHaveDiscount(): void {
    if (this.endDate !== undefined && this.startDate !== undefined) {
      const daysDifference = differenceInDays(this.endDate, this.startDate);
      console.log("diff", daysDifference);
      if (daysDifference === 0 || daysDifference >= 10) {
        this.discountMessage = "";
      }
      if (daysDifference < 5 && daysDifference > 0) {
        this.discountMessage = `Jeśli wydłużysz rezerwację o ${5 - daysDifference} dni otrzymasz zniżkę 5%!`;
      }
      if (daysDifference >= 5 && daysDifference < 10) {
        this.actualDiscountMessage = "Przyznana zniżka wynosi 5%";
        this.discountMessage = `Jeśli wydłużysz rezerwację o ${10 - daysDifference} dni otrzymasz zniżkę 10%!`;
      }
      if (daysDifference >= 10) {
        this.actualDiscountMessage = "Przyznana zniżka wynosi 10%";
      }
    }
  }
  isDownloadButtonVisible(): boolean | undefined {
    for (const controlName in this.formModel.controls) {
      console.log(controlName, this.formModel.controls[controlName].valid);
      if (controlName !== "pdf_file" && !this.formModel.controls[controlName].valid) {
        return false;
      }
    }
    this.downloadButtonVisible = true;
    return true;
  }

  async downloadReservationPdf() {
    const formValues = this.formModel.value;
    const pdfBytes = await this.pdfService.generateCarReservationPdf({
      manufacturer: this.manufacturerName,
      model: this.car?.Model,
      startDate: formValues.start_of_reservation,
      endDate: formValues.end_of_reservation
    });
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    this.downloadLink = window.URL.createObjectURL(blob);
    console.log("link", this.downloadLink);
  }
  async downloadPdf() {
    await this.downloadReservationPdf();

    const link = document.createElement("a");
    link.href = this.downloadLink || "";
    link.download = `potwierdzenie_rezerwacji_${this.manufacturerName}_${this.car?.Model}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    for (const controlName in this.formModel.controls) {
      if (controlName !== "pdf_file") {
        console.log(this.formModel.controls[controlName]);
        this.formModel.controls[controlName].disable();
      }
    }
  }

  async calculateTotalCost(start: Date | undefined, end: Date | undefined) {
    if (end && start && end > start) {
      if (this.car?.RentalCost && start && end) {
        try {
          console.log("start", start);
          console.log("end", end);
          const totalCost = await this.reservationService.calculateTotalCost(start, end, this.car.RentalCost);

          this.formModel.get("total_cost")?.setValue(totalCost);
        } catch (error) {
          console.error("Błąd podczas obliczania kosztu:", error);
        }
      }
    }
  }
  get controls() {
    return this.formModel.controls;
  }

  showPotentialErrors() {
    this.showErrors = true;
    if (!this.formModel.valid) {
      this.scrollToErrors();
    }
  }
  scrollToErrors() {
    const scroll2Element = document.querySelector(".errors");
    if (scroll2Element) {
      scroll2Element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  addReservation() {
    const formValues = this.formModel.getRawValue();
    console.log(formValues);
    this.userService.getOneUser(formValues.email)?.subscribe((result: any) => {
      console.log(result);
      if (result === null) {
        this.user = new UserData({
          name: formValues.name,
          surname: formValues.surname,
          email: formValues.email,
          phone_number: formValues.phoneNumber
        });
        console.log("user", this.user);
        // post usera do bazy
        // tu id bedzie po dodaniu do bazy
        this.userService.createUser(this.user).subscribe((add_result: any) => {
          const total_cost = this.reservationService.calculateTotalCost(
            new Date(formValues.start_of_reservation),
            new Date(formValues.end_of_reservation),
            this.car?.RentalCost || 0
          );
          // add_result to obiekt dodanego uzytkownika - zawiera id
          // utworzenie nowej rezerwacji
          console.log("newRes", add_result);
          console.log(add_result.userId);
          const reservation: Reservation = new Reservation({
            userId: add_result.id,
            carId: this.car?.Id, //formValues.car_id, // nie wiem czy to zadziała
            start_of_reservation: this.formService.convertDateForSaveToDb(formValues.start_of_reservation),
            end_of_reservation: this.formService.convertDateForSaveToDb(formValues.end_of_reservation),
            total_cost: formValues.total_cost
          });
          this.reservationService.createReservation(reservation).subscribe((add_reservation: Reservation) => {
            this.carService
              .patchCar(
                {
                  available_count: this.car?.AvailableCount ? this.car.AvailableCount - 1 : undefined
                },
                this.car?.Id
              )
              .subscribe((patched_car: CarData) => {
                console.log("Dodano rezerwacje: ", add_reservation);
                console.log("Zmodyfikowana ilość dostępnych: ", patched_car);
              });
          });
        });
      } else {
        const total_cost = this.reservationService.calculateTotalCost(
          new Date(formValues.start_of_reservation),
          new Date(formValues.end_of_reservation),
          this.car?.RentalCost || 0
        );
        console.log("else_result", result);
        // nie robimy post wiec nie trzeba tworzyc obiektu user
        const reservation: Reservation = new Reservation({
          userId: result.id,
          carId: this.car?.Id, //formValues.car_id, // nie wiem czy to zadziała
          start_of_reservation: this.formService.convertDateForSaveToDb(formValues.start_of_reservation),
          end_of_reservation: this.formService.convertDateForSaveToDb(formValues.end_of_reservation),
          total_cost: formValues.total_cost
        });
        this.reservationService.createReservation(reservation).subscribe((add_reservation: Reservation) => {
          this.carService
            .patchCar(
              {
                available_count: this.car?.AvailableCount ? this.car.AvailableCount - 1 : undefined
              },
              this.car?.Id
            )
            .subscribe((patched_car: CarData) => {
              console.log("Dodano rezerwacje: ", add_reservation);
              console.log("Zmodyfikowana ilość dostępnych: ", patched_car);
            });
        });
      }
      this.router.navigate([""]);
    });

    /*const reservation: Reservation = new Reservation(
      value,
      formValues.car_id,
      formValues.name,
      formValues.surname,
      formValues.email,
      formValues.phoneNumber,
      this.formService.convertDateToDefaultFormat(
        formValues.start_of_reservation
      ),
      this.formService.convertDateToDefaultFormat(
        formValues.end_of_reservation
      ),
      formValues.total_cost
    );


    const total_cost = this.reservationService.calculateTotalCost(
      new Date(formValues.start_of_reservation),
      new Date(formValues.end_of_reservation),
      this.car?.RentalCost || 0
    );
    this.reservationService.getNextId().subscribe((value) => {
      const reservation: Reservation = new Reservation(
        value,
        formValues.car_id,
        formValues.name,
        formValues.surname,
        formValues.email,
        formValues.phoneNumber,
        this.formService.convertDateToDefaultFormat(
          formValues.start_of_reservation
        ),
        this.formService.convertDateToDefaultFormat(
          formValues.end_of_reservation
        ),
        formValues.total_cost
      );
      this.reservationService
        .createReservation(reservation)
        .subscribe((add_reservation: Reservation) => {
          console.log('Dodano rezerwacje: ', add_reservation);
        });
      this.router.navigate(['']);
    });*/
  }

  ngOnDestroy() {
    // Odsubskrybuj zmiany daty przy zniszczeniu komponentu
    if (this.dateSubscription) {
      this.dateSubscription.unsubscribe();
    }
  }
}
