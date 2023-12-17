import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { FormsModule } from '@angular/forms';
import { ShowListComponent } from './components/show-list/show-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchCarPipe } from './pipes/search-car.pipe';
import { ChangeEditButtonDirective } from './directives/change-edit-button.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { AddCarComponent } from './components/add-car/add-car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
const routes: Routes =
[
  {path:'', component: ShowListComponent},
  {path:'add', component: AddCarComponent},
  {path:'details/:id', component: CarDetailsComponent},
  {path:'reserve/:id', component: AddReservationComponent}
  // tutaj jeszcze not found component
]

@NgModule({
  declarations: [
    AppComponent,
    EditCarComponent,
    ShowListComponent,
    SearchCarPipe,
    ChangeEditButtonDirective,
    ScrollToDirective,
    AddCarComponent,
    AddReservationComponent,
    CarDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule 
{

}
