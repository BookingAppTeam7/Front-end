import { Component, Inject ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PriceCard } from 'src/app/accommodation/accommodation/model/priceCard.model';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: 'app-edit-price-card-dialog',
  templateUrl: 'edit-price-card-dialog.component.html',
  styleUrls: ['./edit-price-card-dialog.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule,MatNativeDateModule,MatDatepickerModule,MatInputModule,MatButtonModule,CommonModule,MatFormFieldModule]
})
export class EditPriceCardDialogComponent  implements OnInit {
  element:PriceCard;
  form:FormGroup;
  constructor(public dialogRef: MatDialogRef<EditPriceCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {element:PriceCard},
    private fb: FormBuilder
  ) {  }

  ngOnInit(): void {

    this.form = this.fb.group({
      startDateEdit: [null],
      endDateEdit: [null],
      priceEdit: [null],});

    this.element = this.data.element;
    if (this.data && this.data.element && this.data.element.timeSlot) {
      const startDate = this.data.element.timeSlot.startDate;
      const endDate = this.data.element.timeSlot.endDate;
      const price = this.data.element.price;
  
      this.form.patchValue({
        startDateEdit: startDate,
        endDateEdit: endDate,
        priceEdit: price,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close('cancel');
  }

  onSaveClick(): void {
    const updatedValues = this.form.value;

    this.element.timeSlot.startDate = updatedValues.startDateEdit;
    this.element.timeSlot.endDate = updatedValues.endDateEdit;
    this.element.price = updatedValues.priceEdit;

    console.log(this.element)
  
    this.dialogRef.close(this.element);
  }
}
