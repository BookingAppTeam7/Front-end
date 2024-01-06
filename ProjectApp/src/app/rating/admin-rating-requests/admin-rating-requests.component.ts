import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { Accommodation } from 'src/app/accommodation/accommodation/model/accommodation.model';
import { PriceCardService } from 'src/app/accommodation/priceCard.service';
import { ReservationStatusEnum } from 'src/app/models/enums/reservationStatusEnum';
import { Reservation } from 'src/app/models/reservation/reservation.model';
import { ReservationService } from 'src/app/models/reservation/reservation.service';
import { ReservationComponent } from 'src/app/reservation/reservation.component';
import { ReviewTableDTO } from '../ReviewTableDTO';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/user.service';
import { RoleEnum } from 'src/app/models/userEnums.model';
import { ReviewService } from '../review.service';
import { Review } from 'src/app/accommodation/accommodation/model/review.model';
import { Observable } from 'rxjs';
import { AccommodationsReviewsDialogComponent } from './accommodations-reviews-dialog/accommodations-reviews-dialog.component';


@Component({
  selector: 'app-admin-rating-requests',
  templateUrl: './admin-rating-requests.component.html',
  styleUrls: ['./admin-rating-requests.component.css'],
  standalone: true,
  imports: [MatChipsModule,MatPaginatorModule, MatIconModule,MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, CommonModule, LayoutModule, ReservationComponent]
})
export class AdminRatingRequestsComponent {

  pendingOwnersReview:ReviewTableDTO[]=[];
  pendingAccommodationsReview:ReviewTableDTO[]=[];
  owners:User[];
  accommodations:Accommodation[];
  

  dataSourceOwners = new MatTableDataSource<ReviewTableDTO>([]);
  dataSourceAccommodations = new MatTableDataSource<ReviewTableDTO>([]);
 
  displayedColumnsOwner: string[] = ['ownerId', 'numOfReviews','actions'];
  displayedColumnsAccommodation: string[] = ['accommodationId', 'numOfReviews','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,private snackBar:MatSnackBar,private cdr: ChangeDetectorRef,private fb:FormBuilder,private accommodationService:AccommodationService,private userService:UserService,private reviewService:ReviewService,private dialog:MatDialog) {
  }

 
  ngOnInit() {
    this.userService.findByRole(RoleEnum.OWNER).subscribe(users => {
      this.owners = users;
      this.owners.forEach(owner => {
        this.getOwnersReviews(owner.username).subscribe(ownersReviews => {
          const numOfReviews = ownersReviews ? ownersReviews.length : 0;
          const reviewTableDTO: ReviewTableDTO = {
            ownerId: owner.username,
            accommodationId: -1,
            numOfReviews: numOfReviews,
            reviews: ownersReviews || []
          };
          this.pendingOwnersReview.push(reviewTableDTO);
          this.dataSourceOwners.data = this.pendingOwnersReview;
        });
      });
    });



    this.accommodationService.getAll().subscribe(accommodations => {
      this.accommodations = accommodations;
      this.accommodations.forEach(a => {
        if (a.id !== undefined) { 
        this.getAccommodationsReviews(a?.id).subscribe(accommodationsReviews => {
          const numOfReviews = accommodationsReviews ? accommodationsReviews.length : 0;
          const reviewTableDTO: ReviewTableDTO = {
            ownerId: "",
            accommodationId: a?.id || -1,
            numOfReviews: numOfReviews,
            reviews: accommodationsReviews || []
          };
          this.pendingAccommodationsReview.push(reviewTableDTO);
          
          this.dataSourceAccommodations.sort=this.sort;

          this.pendingAccommodationsReview.sort((a, b) => {
            return b.numOfReviews - a.numOfReviews;
          });
          
          this.dataSourceAccommodations.data = this.pendingAccommodationsReview;
          this.dataSourceAccommodations.paginator=this.paginator;
      
        });
      }
      });
    
    });
  }

  getOwnersReviews(ownerId:string) :Observable<Review[] | null> {

    return this.reviewService.findByOwnerId(ownerId);
  }

  getAccommodationsReviews(accommodationId:number) :Observable<Review[] | null> {

    return this.reviewService.findByAccommodationId(accommodationId);
  }

  viewOwnersReviews(reviews:Review[],ownerId:string){


  }

  viewAccommodationsReviews(reviews:Review[],accommodationId:number){

    this.dialog.open(AccommodationsReviewsDialogComponent, {
      data: { reviews },
      width: '600px' // Set the width as per your requirements
    });
    
    
  }

}

