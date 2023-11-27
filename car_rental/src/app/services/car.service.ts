import { Injectable } from '@angular/core';
import {CarData} from '../models/car-data';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private url = "vehicle";
  constructor(private http:HttpClient) { }

  public getCars():Observable<CarData[]>{
    return this.http.get<CarData[]>(`${environment.apiUrl}/${this.url}`);
  }
  public updateCar(car:CarData):Observable<CarData>{
    return this.http.put<CarData>(`${environment.apiUrl}/${this.url}/${car.Id}`, car);
  }
  public createCar(car:CarData):Observable<CarData[]>{
    return this.http.post<CarData[]>(`${environment.apiUrl}/${this.url}`, car);
  }
  public deleteCar(car:CarData):Observable<CarData[]>{
    return this.http.delete<CarData[]>(`${environment.apiUrl}/${this.url}/${car.Id}`);
  }
}
