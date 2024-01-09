import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CarData } from 'src/app/models/car-data';
import { ManufacturerData } from 'src/app/models/manufacturer';
import { TypeData } from 'src/app/models/type';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent {
  @ViewChild('deleteDialog') deleteDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('successDialog') successOrExceptionDialog!: ElementRef<HTMLDialogElement>;
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
  FormatDate(date:string):string{
    const originalDate:Date = new Date(date.split('T')[0]);

    const options:object = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate:string = new Intl.DateTimeFormat('pl-PL', options).format(originalDate);
    return formattedDate;
  }
  ngOnInit(): void {
    console.log("inti");
    this.carService.getCars().subscribe((result: any[]) => {
      this.cars = result.map((carData: any) => {
        console.log(carData.date_of_manufacture);
        let car:CarData =  new CarData(
          {
            manufacturerId: carData.manufacturerId,
            typeId: carData.typeId,
            model: carData.model,
            date_of_manufacture: this.FormatDate(carData.date_of_manufacture),
            available_count: carData.available_count,
            rental_cost: carData.rental_cost,
            gearbox: carData.gearbox
          });
          car.Id = carData.id;
          car.Manufacturer = new ManufacturerData({
            name: carData.manufacturer.name
          });
          car.Manufacturer.Id=carData.manufacturer.id;
          car.Type = new TypeData({
            name: carData.type.name,
            seats_count: carData.type.seats_count
          });
          car.Type.Id=carData.type.id;
          console.log(car);
          return car;
      });
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
      info.textContent = `Czy napewno chcesz usunąć ${car.Manufacturer?.Name} ${car.Model}?`;
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
        this.ShowSuccessOrExceptionDialog(`Pomyślnie usunięto samochód ${car.Manufacturer?.Name} ${car.Model}`);
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
  updateCarsList(car:any){
    console.log(car.id);
    this.carService.getOneCar(car.id).subscribe((carData: any) => {
      let fetchedCar:CarData =  new CarData(
        {
          manufacturerId: carData.manufacturerId,
          typeId: carData.typeId,
          model: carData.model,
          date_of_manufacture: this.FormatDate(carData.date_of_manufacture),
          available_count: carData.available_count,
          rental_cost: carData.rental_cost,
          gearbox: carData.gearbox
        });
        fetchedCar.Id = carData.id;
        fetchedCar.Manufacturer = new ManufacturerData({
          name: carData.manufacturer.name
        });
        fetchedCar.Manufacturer.Id=carData.manufacturer.id;
        fetchedCar.Type = new TypeData({
          name: carData.type.name,
          seats_count: carData.type.seats_count
        });
        fetchedCar.Type.Id=carData.type.id;
        const index = this.cars.findIndex(c => c.Id === car.id);
        console.log("i", index);
        if (index !== -1) {
          this.cars[index] = fetchedCar;
        }

        this.carToEdit=undefined;
    });
  }
}
