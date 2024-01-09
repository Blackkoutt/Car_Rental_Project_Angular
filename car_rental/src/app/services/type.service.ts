import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeData } from '../models/type';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private url ="types"
  constructor(private http:HttpClient) { }

  public getTypes():Observable<TypeData[]>{
    return this.http.get<TypeData[]>(`${environment.apiUrl}/${this.url}`);
  }
}
