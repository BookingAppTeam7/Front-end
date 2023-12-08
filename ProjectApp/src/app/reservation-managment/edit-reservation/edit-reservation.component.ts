import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationPostDTO } from 'src/app/models/dtos/reservationPostDTO.model';
import { TimeSlotEnum } from 'src/app/models/enums/timeSlotEnum';
import { ReservationService } from 'src/app/models/reservation/reservation.service';
import { ReservationPutDTO } from 'src/app/models/dtos/reservationPutDTO.model';
import { ReservationStatusEnum } from 'src/app/models/enums/reservationStatusEnum';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css'],
  standalone:true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatChipsModule,LayoutModule,ReactiveFormsModule,MatRadioModule, MatDatepickerModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,MatButtonModule],
  
})
export class EditReservationComponent {
  constructor(private reservationService:ReservationService){}
  reservationId:number=4//test
  editReservationForm=new FormGroup({
    accommodationId:new FormControl(),
    userId: new FormControl(),
    startDate:new FormControl(),
    endDate:new FormControl(),
    reservationStatus:new FormControl()
  })

  saveChanges(){
    const statusValue: string | undefined=this.editReservationForm.get('reservationStatus')?.value;
    const statusEnum:ReservationStatusEnum=ReservationStatusEnum[statusValue as keyof typeof ReservationStatusEnum];
    const updatedReservation: ReservationPutDTO={
      accommodationId:this.editReservationForm.value.accommodationId,
      userId:this.editReservationForm.value.userId,
      timeSlot:{
        startDate:this.editReservationForm.value.startDate,
        endDate:this.editReservationForm.value.endDate,
      },
      status:statusEnum
    };
    this.reservationService.update(updatedReservation,this.reservationId).subscribe({});
  }
}
