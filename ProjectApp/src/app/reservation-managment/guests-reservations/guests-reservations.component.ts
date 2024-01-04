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
  selector: 'app-guests-reservations',
  templateUrl: './guests-reservations.component.html',
  styleUrls: ['./guests-reservations.component.css'],
  standalone: true,
  imports: [MatChipsModule,MatPaginatorModule, MatIconModule,MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, CommonModule, LayoutModule, ReservationComponent]
})
export class GuestsReservationsComponent {

  reservations:Reservation[]=[];
  accommodationId:number;    //accommodation id 
  accommodation:Accommodation;  //accommodation to be updated

  accessToken: any = localStorage.getItem('user');
  helper = new JwtHelperService();
  decodedToken = this.helper.decodeToken(this.accessToken);
  guestId:string=""

  pendingReservations:Reservation[]=[];
  approvedReservations:Reservation[]=[];
  rejectedReservations:Reservation[]=[];
  cancelledReservations:Reservation[]=[];


  dataSourcePending = new MatTableDataSource<Reservation>([]);
  dataSourceApproved = new MatTableDataSource<Reservation>([]);
  dataSourceRejected = new MatTableDataSource<Reservation>([]);
  dataSourceCancelled = new MatTableDataSource<Reservation>([]);
  displayedColumnsApproved: string[] = ['Id', 'Start Date', 'End Date', 'Guests number','Status','actions'];
  displayedColumns: string[] = ['Id', 'Start Date', 'End Date', 'Guests number','Status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,private snackBar:MatSnackBar,private cdr: ChangeDetectorRef,private fb:FormBuilder,private accommodationService:AccommodationService,private priceCardService:PriceCardService,private reservationService:ReservationService,private dialog:MatDialog) {
  }
  
  ngOnInit(): void {

    this.guestId=this.decodedToken.sub;

    this.reservationService.getByGuestId(this.guestId).subscribe(
      (reservations: Reservation[]|undefined) => {
        if(reservations){
        this.reservations = reservations;
        this.pendingReservations = this.reservations.filter(r => r.status === 'PENDING');
        this.approvedReservations = this.reservations?.filter(r => r.status === 'APPROVED');
        this.rejectedReservations = this.reservations?.filter(r => r.status === 'REJECTED');
        this.cancelledReservations=this.reservations?.filter(r => r.status === 'CANCELLED');
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
        console.error('Error getting reservations for user:', error);
      }
    );

    this.cdr.detectChanges();

  }

  cancelReservation(reservation:Reservation){
    console.log(reservation);

    this.accommodationService.getById(reservation.accommodationId).subscribe(
      (accommodation: Accommodation | undefined) => {
        if (accommodation) {
          const currentDate = new Date();
          const reservationStartDate = new Date(reservation.timeSlot.startDate);
          const cancellationDeadline = accommodation.cancellationDeadline;
          const cancellationDate = new Date(reservationStartDate);
          cancellationDate.setDate(cancellationDate.getDate() - cancellationDeadline);

          if (currentDate > cancellationDate) {
            this.openSnackBar("Reservation can not be cancelled because of cancellation deadline.")
          }
          else{
              //ovde treba promeniti status rezervacije i kreirati novi pricecard
              this.reservationService.cancelReservation(reservation.id).subscribe(
                () => {
                  
                },
                (error) => {
                  console.error('ERROR:', error);
                }
              );

              this.openSnackBar("Reservation is successfully CANCELLED!")
          }
          
        
        }
      },
      (error) => {
        console.error('ERROR:', error);
      }
    );

    

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 4000,
    });
  }
  rateOwner(accommodationId:number){
   // this.router.navigate(['ownerRating']);
   
      // Navigacija ka komponenti 'ownerRating' sa ID-om kao parametrom
    this.router.navigate(['ownerRating',accommodationId]);
    
  }
  rateAccommodation(accommodationId:number){
    this.router.navigate(['accommodationRating',accommodationId]);
    
  }
}
