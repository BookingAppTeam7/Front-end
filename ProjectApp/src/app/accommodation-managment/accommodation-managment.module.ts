import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { PriceCardComponent } from './price-card/price-card.component';
import { AvailabilityCardComponent } from './availability-card/availability-card.component';
import { EditAccommodationComponent } from './edit-accommodation/edit-accommodation.component';


@NgModule({
  declarations: [
    CreateAccommodationComponent,
    PriceCardComponent,
    AvailabilityCardComponent,
    EditAccommodationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccommodationManagmentModule { }
