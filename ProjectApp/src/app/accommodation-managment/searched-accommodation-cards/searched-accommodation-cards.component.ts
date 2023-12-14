import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AccommodationDataService } from 'src/app/accommodation/accommodation-data.service.module';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { AccommodationDetails } from 'src/app/accommodation/accommodation/model/accommodationDetails.model';
import { AccommodationTypeEnum } from 'src/app/models/enums/accommodationTypeEnum';

@Component({
  selector: 'app-searched-accommodation-cards',
  templateUrl: './searched-accommodation-cards.component.html',
  styleUrls: ['./searched-accommodation-cards.component.css'],
  standalone:true,
  imports:[CommonModule,MatCardModule,MatRadioModule,MatButtonModule,MatChipsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule, MatIconModule]
})
export class SearchedAccommodationCardsComponent implements OnInit{
  accommodationList: AccommodationDetails[] = [];
  filteredAccommodations:AccommodationDetails[] | undefined;
  accommodationTypeEnum=AccommodationTypeEnum;
  constructor(private accommodationService:AccommodationService,private dataService: AccommodationDataService,private router: Router) {}
  filterAccommodationForm=new FormGroup({
    amenities:new FormControl(),
    type: new FormControl(),
    minPrice: new FormControl(0,[Validators.required, Validators.pattern('^[0-9]+$')]),
    maxPrice: new FormControl(0,[Validators.required, Validators.pattern('^[0-9]+$')]),
  })
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
  filterData(){
    const type = this.filterAccommodationForm.get('type')?.value;
  const amenities = this.filterAccommodationForm.get('amenities')?.value || [];
  const minPrice = this.filterAccommodationForm.get('minPrice')?.value ?? 0;
  const maxPrice = this.filterAccommodationForm.get('maxPrice')?.value ?? 0;

  console.log('Selected type:', type);
  console.log('Selected amenities:', amenities.join(','));
  console.log('Minimum price:', minPrice);
  console.log('Maximum price:', maxPrice);
    console.log(JSON.stringify(this.accommodationList));
  this.accommodationService
    .filter(JSON.stringify(this.accommodationList), amenities, type, minPrice, maxPrice)
    .subscribe(
      (filteredAccommodations) => {
        this.filteredAccommodations = filteredAccommodations;
        console.log('Filtered Accommodations:', this.filteredAccommodations);
      },
      (error) => {
        console.error('Error filtering accommodations:', error);
      }
    );
  }
}
