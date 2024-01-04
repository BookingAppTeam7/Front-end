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
  

  dataSourceOwners = new MatTableDataSource<ReviewTableDTO>([]);
 
  displayedColumnsOwner: string[] = ['ownerId', 'numOfReviews','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,private snackBar:MatSnackBar,private cdr: ChangeDetectorRef,private fb:FormBuilder,private accommodationService:AccommodationService,private priceCardService:PriceCardService,private reservationService:ReservationService,private dialog:MatDialog) {
  }

  ngOnInit(){
    
  }



}
