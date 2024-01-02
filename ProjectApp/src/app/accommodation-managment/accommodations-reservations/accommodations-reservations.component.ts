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
import { Reservation } from 'src/app/models/reservation/reservation.model';
import { ReservationService } from 'src/app/models/reservation/reservation.service';
import { ReservationComponent } from 'src/app/reservation/reservation.component';

@Component({
  selector: 'app-accommodations-reservations',
  templateUrl: './accommodations-reservations.component.html',
  styleUrls: ['./accommodations-reservations.component.css'],
  standalone: true,
  imports: [MatChipsModule,MatPaginatorModule, MatIconModule,MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, CommonModule, LayoutModule, ReservationComponent]
})
export class AccommodationsReservationsComponent {

  reservations:Reservation[]|undefined;
  accommodationId:number;    //accommodation id 
  accommodation:Accommodation;  //accommodation to be updated

  accessToken: any = localStorage.getItem('user');
  helper = new JwtHelperService();
  decodedToken = this.helper.decodeToken(this.accessToken);
  ownerId:string=""

  pendingReservations:Reservation[]|undefined;
  approvedReservations:Reservation[]|undefined;
  rejectedReservations:Reservation[]|undefined;


  dataSourcePending = new MatTableDataSource<Reservation>([]);
  dataSourceApproved = new MatTableDataSource<Reservation>([]);
  dataSourceRejected = new MatTableDataSource<Reservation>([]);
  displayedColumns: string[] = ['Id', 'Start Date', 'End Date', 'Guests number','Status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,private snackBar:MatSnackBar,private cdr: ChangeDetectorRef,private fb:FormBuilder,private accommodationService:AccommodationService,private priceCardService:PriceCardService,private reservationService:ReservationService,private dialog:MatDialog) {
  }
  

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.accommodationId = +params.get('id')!;
    });

    this.ownerId=this.decodedToken.sub;

    this.reservationService.getByAccommodationId(this.accommodationId).subscribe(
      (reservations: Reservation[]|undefined) => {
        this.reservations = reservations;
        this.pendingReservations = this.reservations?.filter(r => r.status === 'PENDING');
        this.approvedReservations = this.reservations?.filter(r => r.status === 'APPROVED');
        this.rejectedReservations = this.reservations?.filter(r => r.status === 'REJECTED');
  
        this.dataSourcePending=new MatTableDataSource<Reservation>(this.pendingReservations);
        this.dataSourceApproved=new MatTableDataSource<Reservation>(this.approvedReservations);
        this.dataSourceRejected=new MatTableDataSource<Reservation>(this.rejectedReservations);

        this.dataSourcePending.paginator=this.paginator;
        this.dataSourcePending.sort=this.sort;

        this.dataSourceApproved.paginator=this.paginator;
        this.dataSourceApproved.sort=this.sort;

        this.dataSourceRejected.paginator=this.paginator;
        this.dataSourceRejected.sort=this.sort;
        
        console.log(this.reservations);
      },
      (error) => {
        console.error('Error getting reservations for accommodation:', error);
      }
    );

    this.cdr.detectChanges();

  }

}
