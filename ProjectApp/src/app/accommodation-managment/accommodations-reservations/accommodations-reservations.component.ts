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

@Component({
  selector: 'app-accommodations-reservations',
  templateUrl: './accommodations-reservations.component.html',
  styleUrls: ['./accommodations-reservations.component.css'],
  standalone: true,
  imports: [MatChipsModule,MatPaginatorModule, MatIconModule,MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, CommonModule, LayoutModule, ReservationComponent]
})
export class AccommodationsReservationsComponent {

  reservations:Reservation[]=[];
  accommodationId:number;    //accommodation id 
  accommodation:Accommodation;  //accommodation to be updated

  accessToken: any = localStorage.getItem('user');
  helper = new JwtHelperService();
  decodedToken = this.helper.decodeToken(this.accessToken);
  ownerId:string=""

  pendingReservations:Reservation[]=[];
  approvedReservations:Reservation[]=[];
  rejectedReservations:Reservation[]=[];


  dataSourcePending = new MatTableDataSource<Reservation>([]);
  dataSourceApproved = new MatTableDataSource<Reservation>([]);
  dataSourceRejected = new MatTableDataSource<Reservation>([]);
  displayedColumnsPending: string[] = ['Id', 'Start Date', 'End Date', 'Guests number','Status','actions'];
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
        if(reservations){
        this.reservations = reservations;
        this.pendingReservations = this.reservations.filter(r => r.status === 'PENDING');
        this.approvedReservations = this.reservations?.filter(r => r.status === 'APPROVED');
        this.rejectedReservations = this.reservations?.filter(r => r.status === 'REJECTED');
  
        console.log('All Reservations:', this.reservations);
      console.log('Pending Reservations:', this.pendingReservations);
      console.log('Approved Reservations:', this.approvedReservations);
      console.log('Rejected Reservations:', this.rejectedReservations);



        this.dataSourcePending=new MatTableDataSource<Reservation>(this.pendingReservations);
        this.dataSourceApproved=new MatTableDataSource<Reservation>(this.approvedReservations);
        this.dataSourceRejected=new MatTableDataSource<Reservation>(this.rejectedReservations);

        this.dataSourcePending.paginator=this.paginator;
        this.dataSourcePending.sort=this.sort;
        
        console.log(this.reservations);
        }
      },
      (error) => {
        console.error('Error getting reservations for accommodation:', error);
      }
    );

    this.cdr.detectChanges();

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 4000,
    });
  }

  approveRequest(reservation:Reservation){

      this.reservationService.confirmReservation(reservation.id).subscribe(
          () => {
              console.log('Reservation confirmed successfully.');
          },
          error => {
          }
      );

      this.openSnackBar('Sucessfully approved reservation request!');

      this.rejectOverlappingRequests(reservation.timeSlot.startDate,reservation.timeSlot.endDate,reservation.id);
      this.pendingReservations = this.pendingReservations?.filter(r => r.id !== reservation.id);
      reservation.status=ReservationStatusEnum.APPROVED;
      this.approvedReservations?.push(reservation);
      this.dataSourcePending.data = this.pendingReservations;
      this.dataSourceApproved.data = this.approvedReservations;
  }

  rejectRequest(reservation:Reservation){
    this.reservationService.rejectReservation(reservation.id).subscribe(
      () => {
          console.log('Reservation rejected successfully.');
          
      },
      error => {
      }
  );
  this.openSnackBar('Sucessfully rejected reservation request!');

  this.pendingReservations = this.pendingReservations.filter(r => r.id !== reservation.id);
  reservation.status=ReservationStatusEnum.REJECTED;
  this.rejectedReservations.push(reservation);

  this.dataSourcePending.data = this.pendingReservations;
  this.dataSourceRejected.data = this.rejectedReservations;
    
  }

  rejectOverlappingRequests(startDate:Date,endDate:Date,reservationId:number|undefined){
    const overlappingReservations: Reservation[] = [];
    for (const reservation of this.pendingReservations) {
      if (reservation.id!=reservationId && !this.checkOverlap(reservation)) {
        overlappingReservations.push(reservation);
      }
    }
    console.log(overlappingReservations)
    for (const reservation of overlappingReservations) {
      this.rejectRequest(reservation);
    }
  }
  checkOverlap(reservation:Reservation): boolean { 

    const newStartDate = new Date(reservation.timeSlot.startDate);
    const newEndDate = new Date(reservation.timeSlot.endDate);
  
    newStartDate.setHours(0, 0, 0, 0);
    newEndDate.setHours(0, 0, 0, 0);
  
    const overlap = this.pendingReservations.some(existingReservation => {
      const existingStartDate = new Date(existingReservation.timeSlot.startDate);
      const existingEndDate = new Date(existingReservation.timeSlot.endDate);
  
      existingStartDate.setHours(0, 0, 0, 0);
      existingEndDate.setHours(0, 0, 0, 0);
  
      console.log('Existing Reservation Start Date:', existingStartDate);
      console.log('Existing Reservation End Date:', existingEndDate);
  
      const overlapStartDate = existingStartDate <= newEndDate && existingEndDate >= newStartDate;
      const overlapEndDate = existingEndDate >= newStartDate && existingStartDate <= newEndDate;
  
      console.log('Overlap Start Date:', overlapStartDate);
      console.log('Overlap End Date:', overlapEndDate);
  
      return overlapStartDate && overlapEndDate;
    });

    console.log('Overlap:', overlap);
    return !overlap;
  }


}