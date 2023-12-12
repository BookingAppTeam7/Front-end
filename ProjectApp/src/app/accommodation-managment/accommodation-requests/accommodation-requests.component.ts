import { Component, OnInit,ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { LayoutModule } from 'src/app/layout/layout.module';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PriceCard } from 'src/app/accommodation/accommodation/model/priceCard.model';
import { CommonModule } from '@angular/common';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PriceTypeEnum } from 'src/app/models/enums/priceTypeEnum';
import { FormControl ,Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AccommodationTypeEnum } from 'src/app/models/enums/accommodationTypeEnum';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { ReservationConfirmationEnum } from 'src/app/models/enums/reservationConfirmationEnum';
import { AccommodationPutDTO } from 'src/app/models/dtos/accommodationPutDTO.model';
import { Accommodation } from 'src/app/accommodation/accommodation/model/accommodation.model';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditPriceCardDialogComponent } from '../edit-price-card-dialog/edit-price-card-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PriceCardService } from 'src/app/accommodation/priceCard.service';
import { Reservation } from 'src/app/models/reservation/reservation.model';
import { ReservationService } from 'src/app/models/reservation/reservation.service';
import { PriceCardPostDTO } from 'src/app/models/dtos/priceCardPostDTO.model';
import { AccommodationStatusEnum } from 'src/app/models/enums/accommodationStatusEnum';
import { AccommodationReviewDialogComponent } from '../accommodation-review-dialog/accommodation-review-dialog.component';

@Component({
  selector: 'app-accommodation-requests',
  templateUrl: './accommodation-requests.component.html',
  styleUrls: ['./accommodation-requests.component.css'],
  standalone:true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatNativeDateModule, MatInputModule, MatIconModule,MatButtonModule,MatChipsModule,MatRadioModule,LayoutModule,MatTableModule, MatPaginatorModule,CommonModule,MatDatepickerModule,MatSnackBarModule],

})
export class AccommodationRequestsComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private accommodationService:AccommodationService,private dialog:MatDialog){}
  displayedColumns: string[] = ['Id', 'Name', 'Type', 'Status','actions'];
  dataSource = new MatTableDataSource<Accommodation>([]);
  accommodations:Accommodation[] | undefined;
  

  ngOnInit(): void {
    this.accommodationService.getByStatus(AccommodationStatusEnum.PENDING).subscribe(
      (accommodations: Accommodation[] | undefined) => {
        this.accommodations = accommodations;
        this.dataSource.data = accommodations || [];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error getting accommodations:', error);
      }
    );
  }

  openReviewDialog(originalElement: Accommodation): void {

    const dialogRef = this.dialog.open(AccommodationReviewDialogComponent, {
      width: '800px', 
      data: {element:JSON.parse(JSON.stringify(originalElement)) }, //Deep copy
    });

    dialogRef.afterClosed().subscribe((updatedElement: Accommodation | string) => {
      this.accommodationService.getByStatus(AccommodationStatusEnum.PENDING).subscribe(
        (accommodations: Accommodation[] | undefined) => {
          this.accommodations = accommodations;
          this.dataSource.data = accommodations || [];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error getting accommodations:', error);
        }
      );
    });
}


}
