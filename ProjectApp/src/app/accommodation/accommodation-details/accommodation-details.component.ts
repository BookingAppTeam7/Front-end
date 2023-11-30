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

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
  standalone:true,
  imports:[MatChipsModule,MatIconModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatListModule],
})
export class AccommodationDetailsComponent implements OnInit{
  accommodation: Accommodation;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private accommodationService:AccommodationService
  ){}
  
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const accommodationId = +params.get('id')!;
      const foundAccommodation = this.accommodationService.getAccommodationById(accommodationId);
      if(foundAccommodation){
        this.accommodation=foundAccommodation;
      }else{
        console.error(`Accommodation with ID ${accommodationId} not found`);
      }
    });
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}


