import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { AvailabilityCardComponent } from './availability-card/availability-card.component';
import { EditAccommodationComponent } from './edit-accommodation/edit-accommodation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditPriceCardDialogComponent } from './edit-price-card-dialog/edit-price-card-dialog.component'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccommodationRequestsComponent } from './accommodation-requests/accommodation-requests.component';
import { AccommodationReviewDialogComponent } from './accommodation-review-dialog/accommodation-review-dialog.component';


@NgModule({
  declarations: [
    CreateAccommodationComponent,
    EditAccommodationComponent,
   EditPriceCardDialogComponent,
   AccommodationRequestsComponent,
   AccommodationReviewDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepicker,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSnackBarModule
  ]
})
export class AccommodationManagmentModule { }
