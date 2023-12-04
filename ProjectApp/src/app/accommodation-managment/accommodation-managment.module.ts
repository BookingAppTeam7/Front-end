import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { AvailabilityCardComponent } from './availability-card/availability-card.component';
import { EditAccommodationComponent } from './edit-accommodation/edit-accommodation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    CreateAccommodationComponent,
    AvailabilityCardComponent,
    EditAccommodationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepicker
  ]
})
export class AccommodationManagmentModule { }
