import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ManufacturerData } from "../models/manufacturer";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ManufacturerService {
  private url = "manufacturers";
  //private url = "reserve";
  constructor(private http: HttpClient) {}

  public getManufacturers(): Observable<ManufacturerData[]> {
    return this.http.get<ManufacturerData[]>(`${environment.apiUrl}/${this.url}`);
  }
  public createManufacturer(man: ManufacturerData): Observable<ManufacturerData> {
    return this.http.post<ManufacturerData>(`${environment.apiUrl}/${this.url}`, man);
  }
  public deleteManufacturer(man: ManufacturerData): Observable<ManufacturerData[]> {
    return this.http.delete<ManufacturerData[]>(`${environment.apiUrl}/${this.url}/${man.Id}`);
  }
}
