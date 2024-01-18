import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserData } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private url = "users";
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${environment.apiUrl}/${this.url}`);
  }
  // to moze zwrocic null
  public getOneUser(email: string): Observable<UserData> | null {
    return this.http.get<UserData>(`${environment.apiUrl}/${this.url}/${email}`);
  }
  public createUser(user: UserData): Observable<UserData> {
    return this.http.post<UserData>(`${environment.apiUrl}/${this.url}`, user);
  }
}
