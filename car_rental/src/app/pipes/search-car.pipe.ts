import { Pipe, PipeTransform } from "@angular/core";
import { CarData } from "../models/car-data";

@Pipe({
  name: "searchCar"
})
export class SearchCarPipe implements PipeTransform {
  transform(cars: CarData[], ...args: string[]): CarData[] {
    let searchBy: string = args[0].toLowerCase();
    let criteria: string = args[1];
    console.log("criteria", criteria);
    if (criteria === undefined) criteria = "manufacturer";
    if (!searchBy) {
      return cars;
    }

    const filteredCars = cars.filter((car) => {
      switch (criteria) {
        case "manufacturer": {
          if (car.Manufacturer?.Name.toLowerCase().includes(searchBy)) {
            return car;
          }
          break;
        }
        case "model": {
          if (car.Model.toLowerCase().includes(searchBy)) {
            return car;
          }
          break;
        }
        case "date_of_manufacture": {
          if (car.DateOfManufacture.includes(searchBy)) {
            return car;
          }
          break;
        }
        case "available_count": {
          if (car.AvailableCount.toString().includes(searchBy)) {
            return car;
          }
          break;
        }
        case "rental_cost": {
          if (car.RentalCost.toString().includes(searchBy)) {
            return car;
          }
          break;
        }
        case "seats_count": {
          if (car.Type?.SeatsCount.toString().includes(searchBy)) {
            return car;
          }
          break;
        }
        case "gearbox": {
          const gearboxText: string = car.GearBox ? "automatyczna" : "manualna";
          if (gearboxText.includes(searchBy)) {
            return car;
          }
          break;
        }
        case "type": {
          if (car.Type?.Name.toLowerCase().includes(searchBy)) {
            return car;
          }
          break;
        }
      }
      return null;
    });
    return filteredCars;
  }
}
