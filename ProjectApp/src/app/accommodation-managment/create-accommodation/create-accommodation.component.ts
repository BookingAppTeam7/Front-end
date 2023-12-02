import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatDialog } from '@angular/material/dialog';
import { PriceCardComponent } from '../price-card/price-card.component';
import { AvailabilityCardComponent } from '../availability-card/availability-card.component';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatChipsModule,MatRadioModule,LayoutModule],
})
export class CreateAccommodationComponent {
  constructor(public dialog: MatDialog,private accommodationService:AccommodationService) {}

  createAccommodationForm=new FormGroup({
    name: new FormControl(),
    location:new FormControl(),
    xCoordinate: new FormControl(),
    yCoordinate: new FormControl(),
    type: new FormControl(),
    minGuests:new FormControl(),
    maxGuests:new FormControl(),
    cancellationDeadline: new FormControl(),
    description:new FormControl(),
    amenities: new FormControl(),
    reservationConfirmation: new FormControl()
  })

  // register(){
    
  //   console.log("KLIK NA DUGME")
  //   const accommodationTypeValue: string | undefined= this.createAccommodationForm.get('type')?.value;
  //   console.log(accommodationTypeValue);
  //   if(accommodationTypeValue!==undefined){
  //     console.log("USAO U IF")
  //     const accommodationTypeEnum: AccommodationTypeEnum = RoleEnum[accommodationTypeValue as keyof typeof AccommodationTypeEnum];
  //     const user: AccommodationPostDTO = {
  //       name: this.createAccommodationForm.value.name,

        
       
  //     }
      
  //     this.userService.create(user).subscribe(
  //       {
        
      
  //         next: (data: UserPostDTO) => {
  //           console.log("isap u subscribeeeeee");
  //           this.router.navigate(['users-view'])
  //         },
        
         
  //       }
        
     // );

  openDatePickerDialog(): void {
    const dialogRef = this.dialog.open(PriceCardComponent, {
      width: '400px',
      data: {}, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });



    
    
}

openAvailabilityDialog(): void {
  const dialogRef = this.dialog.open(AvailabilityCardComponent, {
   width: '400px',
   data: {}, 
 });

 dialogRef.afterClosed().subscribe(result => {
   console.log(result);
 });

}
}
