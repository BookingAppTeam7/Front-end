import { CommonModule } from '@angular/common';
import { OwnerRatingComponent } from './owner-rating/owner-rating.component';
import { MatRadioButton } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import {MaterialModule} from "../infrastructure/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { HomeComponent } from '../layout/home/home.component';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { AccommodationRatingComponent } from './accommodation-rating/accommodation-rating.component';
import { AdminRatingRequestsComponent } from './admin-rating-requests/admin-rating-requests.component';
import { AccommodationsReviewsDialogComponent } from './admin-rating-requests/accommodations-reviews-dialog/accommodations-reviews-dialog.component';
import { OwnerShowReviewsComponent } from './owner-show-reviews/owner-show-reviews.component';


@NgModule({
  declarations: [
    OwnerRatingComponent,
    AccommodationRatingComponent,
    AdminRatingRequestsComponent,
    AccommodationsReviewsDialogComponent,
    OwnerShowReviewsComponent
  ],
  imports: [
    CommonModule,
    MatRadioButton,
    OwnerRatingComponent,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatRadioModule

  ]
})
export class RatingModule { }
