import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Accommodation } from '../accommodation/accommodation/model/accommodation.model';
import { User } from '../models/user.model';
import { RoleEnum } from '../models/userEnums.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AccommodationDataService } from '../accommodation/accommodation-data.service.module';
import { AccommodationService } from '../accommodation/accommodation.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '../layout/layout.module';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Reservation } from '../models/reservation/reservation.model';
import { ReservationService } from '../models/reservation/reservation.service';
import { ReservationStatusEnum } from '../models/enums/reservationStatusEnum';
import { PriceTypeEnum } from '../models/enums/priceTypeEnum';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProfitData } from './profitData.model';

@Component({
  selector: 'app-owner-report',
  templateUrl: './owner-report.component.html',
  styleUrls: ['./owner-report.component.css'],
  standalone:true,
  imports:[MatTableModule,CommonModule,MatFormFieldModule, MatInputModule, MatButtonModule, LayoutModule,ReactiveFormsModule,MatDatepickerModule,MatButtonModule,MatNativeDateModule,MatSnackBarModule]
})
export class OwnerReportComponent {
  accessToken: any = localStorage.getItem('user');
  helper = new JwtHelperService();
  decodedToken = this.helper.decodeToken(this.accessToken);
  loggedInUserId=this.decodedToken.sub;
  role: RoleEnum ;
  wholeUser:User;

  accommodationList: Accommodation[] = []
  ownerAccommodations:Accommodation[] = []
  accommodationProfit: { [key: number]: number } = {};
  allReservations:Reservation[] = [];

  profitData: ProfitData[]=[]
  profitColumns: string[] = ['accommodationId','accName' ,'profit'];
  profitDataSource=new MatTableDataSource<ProfitData>([])


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: AccommodationService, private snackBar:MatSnackBar, private fb: FormBuilder,
    private dataService: AccommodationDataService,private router: Router,
    private authService: AuthService,private cdr: ChangeDetectorRef,
    private userService:UserService, private reservationService:ReservationService) {
  }

  ngOnInit(): void {
    this.service.getAllApproved().subscribe({
      next: (data: Accommodation[]) => {
       this.accommodationList = data
       console.log(this.accommodationList)
       console.log(this.loggedInUserId)
       this.initOwnerAccs()
       console.log(this.ownerAccommodations)
       console.log(this.accommodationProfit)
       this.profitDataSource=new MatTableDataSource<ProfitData>(this.profitData)
       this.profitDataSource.paginator=this.paginator;
       this.profitDataSource.sort=this.sort;
      },
     error: (_) => {console.log("Greska!")}
    })
    
  }
  setDatesForm=this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required]
  },{validators:this.dateValidator});

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
  dateValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    if (startDate && endDate && startDate >= endDate) {
      formGroup.get('endDate')?.setErrors({ dateRange: true });
    } else {
      formGroup.get('endDate')?.setErrors(null);
    }

    if (startDate && endDate && startDate < new Date()) {
      formGroup.get('startDate')?.setErrors({ pastDate: true });
    } else {
      formGroup.get('startDate')?.setErrors(null);
    }

    if (endDate && endDate < new Date()) {
      formGroup.get('endDate')?.setErrors({ pastDate: true });
    } else {
      formGroup.get('endDate')?.setErrors(null);
    }

    return null;
  }

  initOwnerAccs(){
    for(const a of this.accommodationList){
      if(a.ownerId==this.loggedInUserId){
        this.ownerAccommodations.push(a)
        if(a.id){
          this.accommodationProfit[a.id] = 0;
          let pd:ProfitData = new ProfitData(a.id,a.name,0);
          this.profitData.push(pd)
        }
        
      }
    }
  }
  validateDates():boolean{
    const startDate:Date = this.setDatesForm.value.startDate;
    const endDate:Date = this.setDatesForm.value.endDate;
    const today=new Date()
    if(startDate==null || endDate==null){
      this.openSnackBar('Must enter both dates');
      return false
    }
    if (startDate >= endDate) {
      this.openSnackBar('Start date must be before end date.');
      return false;
    }
    
    return true
  }
  generateReport1(){
    if(!this.validateDates())
      return

    for(const pd of this.profitData){
      pd.profit=0;
    }
    const startDate:Date = this.setDatesForm.value.startDate;
    const endDate:Date = this.setDatesForm.value.endDate;
    this.getAllReservations(() => {
      console.log(this.allReservations);
      for (const r of this.allReservations) {
        const reservationStartDate = new Date(r.timeSlot.startDate);
        const reservationEndDate = new Date(r.timeSlot.endDate);
      
        if (r.accommodation.id && r.status === ReservationStatusEnum.APPROVED && 
          reservationStartDate >= startDate && 
          reservationEndDate <= endDate &&
          r.accommodation.id in this.accommodationProfit
        ) {
          this.accommodationProfit[r.accommodation.id] += this.calculateTotalPrice(r);
          for(const pd of this.profitData){
            if(pd.accommodationId==r.accommodation.id){
              pd.profit+=this.calculateTotalPrice(r)
            }
          }
        }
      }
    });
    console.log(this.accommodationProfit)
    //this.profitData = Object.entries(this.accommodationProfit).map(([accommodationId, profit]) => {
     // return { accommodationId: +accommodationId, profit: profit } as ProfitData;
    //});
    console.log(this.profitData)
    this.profitDataSource=new MatTableDataSource<ProfitData>(this.profitData)
    this.profitDataSource.paginator=this.paginator;
    this.profitDataSource.sort=this.sort;
  }
  calculateTotalPrice(r:Reservation):number{
    let ret=this.daysBetween(r.timeSlot.startDate,r.timeSlot.endDate)*r.price;
    if(r.priceType.toString()==="PERGUEST"){
      console.log("USAOOOOOOOOOO")
      ret=ret*r.numberOfGuests;
    }
    return ret;
  }
  daysBetween(arrival:Date, checkout:Date):number{
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    const arrivalTime = new Date(arrival).getTime();
    const checkoutTime = new Date(checkout).getTime();

    const timeDifference = checkoutTime - arrivalTime;
    const daysDifference = Math.round(timeDifference / oneDayMilliseconds);

    return daysDifference;
  }
  getAllReservations(callback: () => void){
    this.reservationService.getAll().subscribe(
      (reservations: Reservation[]|undefined)=>{
        if(reservations){
          this.allReservations=reservations;
          console.log(this.allReservations)
          callback()
        }
      }
    )
  }
}
