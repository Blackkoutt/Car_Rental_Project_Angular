import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CarData } from 'src/app/models/car-data';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent {
  @ViewChild('deleteDialog') deleteDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('uccessDialog') successOrExceptionDialog!: ElementRef<HTMLDialogElement>;
  title = 'car_rental';
  searchValue:string='';
  searchCriteria:string='manufacturer';
  cars: CarData[] = [];
  carToEdit?:CarData;
  isDetailsVisible=false;
  carDetails?:CarData;

  searchValueControl = new FormControl('',[Validators.minLength(3)]);
  searchCriteriaControl = new FormControl('manufacturer');

  constructor(private carService:CarService){
    
  }
  ChangeDetailsVisibility(car:CarData):void{
    this.carDetails = car;
    this.isDetailsVisible=true;
  }
  SetVisibility(value:boolean):void{
    this.isDetailsVisible=value;
  }
  ngOnInit(): void {
    console.log("inti");
    this.carService.getCars().subscribe((result: any[]) => {
      this.cars = result.map((carData: any) => {
        return new CarData(
          carData.id,
          carData.manufacturer,
          carData.model,
          carData.date_of_manufacture,
          carData.available_count,
          carData.rental_cost,
          carData.seats_count,
          carData.gearbox,
          carData.type
        );
      });
      console.log(this.cars[0]);
      console.log(this.cars[0].Manufacturer);
    });
    this.searchCriteriaControl.valueChanges.subscribe(value=>{
      if(this.searchCriteriaControl.valid){
        if(value===null){
          this.searchCriteria='manufacturer';
        }
        else{
          this.searchCriteria=value;
        }
      }
      else{
        this.searchCriteria='manufacturer';
      }
    })

    this.searchValueControl.valueChanges.subscribe(value=>{
      if(this.searchValueControl.valid){
        if(value===null){
          this.searchValue='';
        }
        else{
          this.searchValue=value;
        }
      }
      else{
        this.searchValue='';
      }
    })
  }
  ShowDialog(car:CarData){
    const dialog = this.deleteDialog.nativeElement;
    const info = dialog.querySelector('p');
    if (info) {
      info.textContent = `Czy napewno chcesz usunąć ${car.Manufacturer} ${car.Model}?`;
    }
    dialog.showModal();
    dialog.onreset=()=>{
      dialog.close();
    }
    dialog.onsubmit=()=>{
      this.DeleteCar(car);
    }
  }
  DeleteCar(car:CarData){
    console.log("tu");
    this.carService.deleteCar(car).subscribe({
      next: response => {
        console.log('Usunięto samochód pomyślnie:', response);
        this.cars = this.cars.filter(c => c !== car);
        this.ShowSuccessOrExceptionDialog(`Pomyślnie usunięto samochód ${car.Manufacturer} ${car.Model}`);
      },
      error: error => {
        console.error('Błąd podczas usuwania samochodu:', error);
        this.ShowSuccessOrExceptionDialog(`Wystąpił błąd podczas usuwania samochodu`);
      }
    });
  }
  ShowSuccessOrExceptionDialog(message:string){
    const dialog = this.successOrExceptionDialog.nativeElement;
    const info = dialog.querySelector('p');
    if (info) {
      info.textContent = message;
    }
    
    dialog.showModal();
    setTimeout(()=>{
      dialog.close();
    }, 1500);
  }
  editCar(event:CarData|undefined){
    this.carToEdit=event;
  }
  updateCarsList(car:CarData){
    this.cars.map(old_car=>{
      if(car.Id===old_car.Id){
        return car;
      }
      else{
        return old_car;
      }
    });
    this.carToEdit=undefined;
  }
}
