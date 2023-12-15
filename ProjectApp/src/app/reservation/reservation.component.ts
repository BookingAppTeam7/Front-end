import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccommodationService } from '../accommodation/accommodation.service';
import { AccommodationDataService } from '../accommodation/accommodation-data.service.module';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  standalone:true,
  imports:[MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatDatepickerModule,MatButtonModule,CommonModule]
})
export class ReservationComponent {

  constructor(private service: AccommodationService, private snackBar:MatSnackBar, private fb: FormBuilder,
    private dataService: AccommodationDataService,private router: Router) {
  }
  reservationForm = this.fb.group({
    guests: [0, [Validators.pattern('^[0-9]+$'), Validators.min(1)]],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
  }, { validators: this.dateValidator });

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
  
  dateValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    if (startDate && endDate && startDate >= endDate) {
      formGroup.get('endDate')?.setErrors({ dateRange: true });
    } else {
      formGroup.get('endDate')?.setErrors(null);
    }

    if (startDate && endDate && startDate < new Date()) {
      formGroup.get('startDate')?.setErrors({ pastDate: true });
    } else {
      formGroup.get('startDate')?.setErrors(null);
    }

    if (endDate && endDate < new Date()) {
      formGroup.get('endDate')?.setErrors({ pastDate: true });
    } else {
      formGroup.get('endDate')?.setErrors(null);
    }

    return null;
  }
}
