import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { LayoutModule } from 'src/app/layout/layout.module';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { AccommodationTypeEnum } from 'src/app/models/enums/accommodationTypeEnum';
import { AccommodationPostDTO } from 'src/app/models/dtos/accommodationPostDTO.model';
import { FormArray } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PriceCard } from 'src/app/accommodation/accommodation/model/priceCard.model';
import { PriceTypeEnum } from 'src/app/models/enums/priceTypeEnum';
import { TimeSlotEnum } from 'src/app/models/enums/timeSlotEnum';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatChipsModule,MatRadioModule,LayoutModule,ReactiveFormsModule,MatDatepickerModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,MatButtonModule],
})
export class CreateAccommodationComponent {

  prices:PriceCard[]
  constructor(private accommodationService:AccommodationService) {}

  ngOnInit() {
     this.prices = [];
  }

  createAccommodationForm=new FormGroup({
    name: new FormControl(),
    address:new FormControl(),
    city: new FormControl(),
    country: new FormControl(),
    xCoordinate: new FormControl(),
    yCoordinate: new FormControl(),
    type: new FormControl(),
    minGuests:new FormControl(),
    maxGuests:new FormControl(),
    cancellationDeadline: new FormControl(),
    description:new FormControl(),
    amenities: new FormControl(),
    ownerId:new FormControl(),
    startDate:new FormControl(),
    endDate:new FormControl(),
    price:new FormControl(),
    priceType:new FormControl()
  })

  savePrice(){
    let priceTypeValueEnum=PriceTypeEnum.PERUNIT
    const priceTypeValue: PriceTypeEnum | undefined = this.createAccommodationForm.get('priceType')?.value;
    if(priceTypeValue==0){
      priceTypeValueEnum=PriceTypeEnum.PERGUEST
    }
    if (priceTypeValue !== undefined) {
        const newTimeSlot={
          startDate:this.createAccommodationForm.value.startDate,
          endDate:this.createAccommodationForm.value.startDate,
          type:TimeSlotEnum.PRICECARD
        }
        const newPriceCard = {
            timeSlot:newTimeSlot,
            price: this.createAccommodationForm.value.price,
            type: priceTypeValueEnum
        };
        this.prices.push(newPriceCard);
    } 
  
  }


register(){
    
  const accommodationTypeValue: string | undefined= this.createAccommodationForm.get('type')?.value;
  if(accommodationTypeValue!==undefined){
    const accommodationTypeEnum: AccommodationTypeEnum = AccommodationTypeEnum[accommodationTypeValue as keyof typeof AccommodationTypeEnum];
    const accommodation: AccommodationPostDTO = {
      name: this.createAccommodationForm.value.name,
      description: this.createAccommodationForm.value.description,
      location: {
        address: this.createAccommodationForm.value.address,
        city: this.createAccommodationForm.value.city,
        country: this.createAccommodationForm.value.country,
        x: this.createAccommodationForm.value.xCoordinate,
        y: this.createAccommodationForm.value.yCoordinate
      },
      minGuests: this.createAccommodationForm.value.minGuests,
      maxGuests: this.createAccommodationForm.value.maxGuests,
      type: accommodationTypeEnum,
      assets: this.createAccommodationForm.get('amenities')?.value,
      prices: this.prices,
      ownerId: this.createAccommodationForm.value.ownerId,
      cancellationDeadline: this.createAccommodationForm.value.cancellationDeadline,
      images: []
    };
  
    this.accommodationService.create(accommodation).subscribe({ });
    } 
  }
}
