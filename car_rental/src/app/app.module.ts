import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { FormsModule } from '@angular/forms';
import { ShowListComponent } from './components/show-list/show-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
  {path:'', component: ShowListComponent},
  {path:'modify/:id', component: EditCarComponent} 
  // tutaj jeszcze not found component
]

@NgModule({
  declarations: [
    AppComponent,
    EditCarComponent,
    ShowListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule 
{

}
