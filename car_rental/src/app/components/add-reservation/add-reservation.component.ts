import { ChangeDetectionStrategy,Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarData } from 'src/app/models/car-data';
import { Reservation } from 'src/app/models/reservation';
import { CarService } from 'src/app/services/car.service';
import { FormService } from 'src/app/services/form.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReservationComponent implements OnInit {
  car: CarData | undefined;
  formModel: FormGroup;
  showErrors: boolean = false;
  totalCost: number | undefined;
  private dateSubscription: Subscription | undefined;
  private startDate:Date|undefined;
  private endDate:Date|undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private carService: CarService,
    private formService: FormService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.formModel = formService.createFormReservation();
  }

  ngOnInit() {
    let Id: number = 0;
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
        this.formModel.get('car_id')?.setValue(this.car?.Id);
      });
    });

    this.dateSubscription = this.formModel
    .get('end_of_reservation')
    ?.valueChanges.subscribe((value) => {
      this.endDate=value;
      this.calculateTotalCost(this.startDate, this.endDate);
    });
    this.dateSubscription = this.formModel
    .get('start_of_reservation')
    ?.valueChanges.subscribe((value) => {
      this.startDate=value;
      this.calculateTotalCost(this.startDate, this.endDate);
    });
    // Subskrybuj zmiany daty początkowej i końcowej
    


  }

  async calculateTotalCost(start:Date|undefined, end:Date|undefined) {
    /*const formValues = this.formModel.value;
    const startDate = new Date(formValues.start_of_reservation);
    console.log("Srart",formValues.start_of_reservation);
    const endDate = new Date(formValues.end_of_reservation);
    console.log("End",formValues.end_of_reservation);*/
  
    if (this.car?.RentalCost && start && end) {
      try {
        console.log("start", start);
        console.log("end", end);
        const totalCost = await this.reservationService.calculateTotalCost(
          start,
          end,
          this.car.RentalCost
        );
  
        this.formModel.get('total_cost')?.setValue(totalCost);
      } catch (error) {
        console.error('Błąd podczas obliczania kosztu:', error);
      }
    }
  }
  get controls() {
    return this.formModel.controls;
  }

  showPotentialErrors() {
    this.showErrors = true;
  }



  addReservation() {
    const formValues = this.formModel.value;
    /*const total_cost = this.reservationService.calculateTotalCost(
      new Date(formValues.start_of_reservation),
      new Date(formValues.end_of_reservation),
      this.car?.RentalCost || 0
    );*/
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
    });
  }

  ngOnDestroy() {
    // Odsubskrybuj zmiany daty przy zniszczeniu komponentu
    if (this.dateSubscription) {
      this.dateSubscription.unsubscribe();
    }
  }
}
