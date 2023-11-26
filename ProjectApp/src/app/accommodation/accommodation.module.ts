import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AccommodationComponent,
    AccommodationCardsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class AccommodationModule { }
