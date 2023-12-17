import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-accommodation-details',
    templateUrl: './accommodation-details.component.html',
    styleUrls: ['./accommodation-details.component.css'],
    standalone: true,
    imports: [MatChipsModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, CommonModule, LayoutModule, ReservationComponent]
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation | undefined;
  availableDates: Date[] = [];
  user:UserGetDTO;
  role: RoleEnum ;
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
            this.availableDates = this.extractAvailableDates();
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
  private extractAvailableDates(): Date[] {
    let dates: Date[] = [];
    if (this.accommodation && this.accommodation.prices) {
      for (const priceCard of this.accommodation.prices) {
        if (priceCard.timeSlot && priceCard.timeSlot.startDate && priceCard.timeSlot.endDate) {
          const startDate = new Date(priceCard.timeSlot.startDate);
          const endDate = new Date(priceCard.timeSlot.endDate);
          startDate.setDate(startDate.getDate()-1);
          endDate.setDate(endDate.getDate());
          while (startDate <= endDate) {
            if(startDate>new Date())
              dates.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
          }
        }
      }
    }
    return dates;
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


