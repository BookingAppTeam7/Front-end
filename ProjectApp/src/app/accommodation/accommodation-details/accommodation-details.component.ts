import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/model/accommodation.model';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
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
    this.router.navigate(['/accommodation-cards']);
  }
}


