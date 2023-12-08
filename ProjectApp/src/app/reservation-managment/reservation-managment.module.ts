import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';



@NgModule({
  declarations: [
    CreateReservationComponent,
    EditReservationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReservationManagmentModule { }
