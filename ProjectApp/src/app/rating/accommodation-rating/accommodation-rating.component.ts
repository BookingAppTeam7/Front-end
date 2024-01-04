import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { ReservationService } from 'src/app/models/reservation/reservation.service';
import { ReviewService } from '../review.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReviewPostDTO } from 'src/app/models/dtos/reviewPostDTO.model';
import { ReviewEnum } from 'src/app/models/enums/reviewEnum';
import { ReviewStatusEnum } from 'src/app/models/enums/reviewStatusEnum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-accommodation-rating',
  templateUrl: './accommodation-rating.component.html',
  styleUrls: ['./accommodation-rating.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatSelectModule,
    MatSlideToggleModule,CommonModule,MatRadioModule]
})
export class AccommodationRatingComponent {
  createAccommodationRatingForm: FormGroup;
  reservationId: number;
  accommodationId:number|undefined;
  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private accomodationService:AccommodationService,
    private reviewService:ReviewService,
    private router: Router

  ) { }
  

  ngOnInit(): void {
    this.createAccommodationRatingForm = this.formBuilder.group({
      accommodationName: [''],
      rating: [null],
      comment: ['']
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      const accommodationId = +params.get('id')!;
      this.accomodationService.getById(accommodationId).subscribe(
        (foundAccomodation) => {
          const ownerUsernameControl = this.createAccommodationRatingForm.get('accommodationName');
          if (foundAccomodation !== null && foundAccomodation !== undefined && ownerUsernameControl) {
            ownerUsernameControl.setValue(foundAccomodation.name);
            this.accommodationId=foundAccomodation.id;
          } else {
            console.error(`Owner ID ${foundAccomodation?.ownerId} not found or ownerId control is not defined`);
          }
        },
        (error: any) => {
          console.error('Error fetching owner ID:', error);
        }
      );
    });
    
  }
  

  rateAccommodation() {
    const ownerUsername = this.createAccommodationRatingForm.value.ownerId;
    const rating = this.createAccommodationRatingForm.value.rating;
    const comment = this.createAccommodationRatingForm.value.comment;
    // Rad sa prikupljenim vrednostima
    console.log('Accommodation id:', this.accommodationId);
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    const accessToken: any = localStorage.getItem('user');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(accessToken);
    if(this.accommodationId!=undefined){
      const review: ReviewPostDTO = {
        userId:decodedToken.sub,
        type:ReviewEnum.ACCOMMODATION,//OWNER or ACCOMMODATION
        comment:comment,
        accommodationId:this.accommodationId,
        ownerId:"",
        grade:rating,
        dateTime:new Date(),
        deleted:false,
        reported:false,
        status: ReviewStatusEnum.PENDING
    
      }
      
    this.reviewService.create(review).subscribe(
      {
        next: (data: ReviewPostDTO) => {
          this.router.navigate(['home'])
        },
      }
    );
  }
    }

  
}
