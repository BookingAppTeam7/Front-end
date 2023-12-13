import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AccommodationDataService } from 'src/app/accommodation/accommodation-data.service.module';
import { AccommodationDetails } from 'src/app/accommodation/accommodation/model/accommodationDetails.model';

@Component({
  selector: 'app-searched-accommodation-cards',
  templateUrl: './searched-accommodation-cards.component.html',
  styleUrls: ['./searched-accommodation-cards.component.css'],
  standalone:true,
  imports:[CommonModule,MatCardModule]
})
export class SearchedAccommodationCardsComponent implements OnInit{
  accommodationList: AccommodationDetails[] = [];

  constructor(private dataService: AccommodationDataService,private router: Router) {}

  ngOnInit(): void {
    this.dataService.searchedAccommodations$.subscribe((data) => {
      this.accommodationList = data;
      console.log(this.accommodationList[0]);
    });
  }
  showDetails(accommodation: AccommodationDetails) {
    // Navigate to the details page using the accommodation ID or any other identifier
    this.router.navigate(['/accommodations', accommodation.accommodation.id]);
  }
}
