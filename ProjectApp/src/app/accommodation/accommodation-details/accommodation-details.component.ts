import { Component, OnInit, ViewChild } from '@angular/core';
import { Accommodation } from '../accommodation/model/accommodation.model';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "../../layout/layout.module";
import { ReservationComponent } from "../../reservation/reservation.component";
import { UserGetDTO } from 'src/app/models/userGetDTO.model';
import { RoleEnum } from 'src/app/models/userEnums.model';
import { AuthService } from 'src/app/auth/auth.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PriceCard } from '../accommodation/model/priceCard.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-accommodation-details',
    templateUrl: './accommodation-details.component.html',
    styleUrls: ['./accommodation-details.component.css'],
    standalone: true,
    imports: [MatChipsModule,MatPaginatorModule, MatIconModule,MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, CommonModule, LayoutModule, ReservationComponent]
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation | undefined;
  availableDates: Date[] = [];
  user:UserGetDTO;
  role: RoleEnum ;
  dataSource = new MatTableDataSource<PriceCard>([]);
  displayedColumns: string[] = ['Id', 'Start Date', 'End Date', 'Price','Type'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private accommodationService:AccommodationService,
    private authService: AuthService
  ){}
  
  ngOnInit() {
    this.authService.userState.subscribe((result) => {
      if(result != null){
        this.role = result.role;
      }else{
       this.role=RoleEnum.UNAUTHENTICATED;
      }
     // this.cdr.detectChanges();
    })

    this.route.paramMap.subscribe((params: ParamMap) => {
      const accommodationId = +params.get('id')!;
      this.accommodationService.getById(accommodationId).subscribe(
        (foundAccommodation) => {
          if (foundAccommodation) {
            this.accommodation = foundAccommodation;
            console.log(this.accommodation);
            this.dataSource=new MatTableDataSource<PriceCard>(this.accommodation.prices);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
          } else {
            console.error(`Accommodation with ID ${accommodationId} not found`);
          }
        },
        (error) => {
          console.error('Error fetching accommodation:', error);
        }
      );
    });
  }
  goBack() {
    this.router.navigate(['/home']);
  }
  // Add a getter to explicitly check for non-null images
  get accommodationImages(): string[] | undefined {
    return this.accommodation?.images;
  }

  isDateAvailable(date: Date): boolean {
    return this.availableDates.some((availableDate) => this.isSameDate(date, availableDate));
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

}


