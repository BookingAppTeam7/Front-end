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

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
  standalone:true,
  imports:[MatChipsModule,MatIconModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatListModule,CommonModule],
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation | undefined;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private accommodationService:AccommodationService
  ){}
  
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const accommodationId = +params.get('id')!;
      this.accommodationService.getById(accommodationId).subscribe(
        (foundAccommodation) => {
          if (foundAccommodation) {
            this.accommodation = foundAccommodation;
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
}


