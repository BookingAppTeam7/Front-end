import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/accommodation/accommodation/model/review.model';


@Component({
  selector: 'app-accommodations-reviews-dialog',
  templateUrl: './accommodations-reviews-dialog.component.html',
  styleUrls: ['./accommodations-reviews-dialog.component.css']
})
export class AccommodationsReviewsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { reviews: Review[] }) {}
}
