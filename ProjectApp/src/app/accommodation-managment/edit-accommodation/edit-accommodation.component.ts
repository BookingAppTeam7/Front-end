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
import { PriceCardService } from 'src/app/accommodation/priceCard.service';
import { PriceCard } from 'src/app/accommodation/accommodation/model/priceCard.model';
import { CommonModule } from '@angular/common';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PriceTypeEnum } from 'src/app/models/enums/priceTypeEnum';
import { TimeSlotEnum } from 'src/app/models/enums/timeSlotEnum';
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


@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatNativeDateModule, MatInputModule, MatIconModule,MatButtonModule,MatChipsModule,MatRadioModule,LayoutModule,MatTableModule, MatPaginatorModule,CommonModule,MatDatepickerModule],
})
export class EditAccommodationComponent  implements OnInit{

  AccommodationTypeEnum = AccommodationTypeEnum;
  ReservationConfirmationEnum=ReservationConfirmationEnum;
  accommodationTypeEnum=AccommodationTypeEnum;
  editedItem: PriceCard;
  selectedElement: PriceCard; 


  priceCards: PriceCard[];
  accommodationId:number=46;    //accommodation id 
  accommodation:Accommodation;  //accommodation to be updated
  ownerId :String= "username"                   //ownerId
  dataSource = new MatTableDataSource<PriceCard>([]);
  displayedColumns: string[] = ['Id', 'Start Date', 'End Date', 'Price','Type','actions'];

  editForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private cdr: ChangeDetectorRef,private fb:FormBuilder,private priceCardService: PriceCardService,private accommodationService:AccommodationService,private dialog:MatDialog) {
    this.editForm = this.fb.group({
      startDateEdit: [''],
      endDateEdit: [''],
      priceEdit: [''],
    });
  }
  
  editAccommodationFormGroup=new FormGroup({
    name: new FormControl(),
    description:new FormControl(),
    address: new FormControl(),
    city:new FormControl(),
    country: new FormControl(),
    xCoordinate:new FormControl(),
    yCoordinate:new FormControl(),
    minGuests: new FormControl(),
    maxGuests: new FormControl(),
    cancellationDeadline:new FormControl(),
    startDate:new FormControl(),
    endDate:new FormControl(),
    price:new FormControl(),
    priceType:new FormControl(),
    amenities:new FormControl(),
    type: new FormControl(null, Validators.required),
    reservationConfirmation:new FormControl(),
    startDateEdit:new FormControl(),
    endDateEdit:new FormControl(),
    priceEdit:new FormControl(),
    priceCardId:new FormControl(),
 })
 


  ngOnInit(): void {

    this.accommodationService.getById(this.accommodationId)
    .subscribe(
      (response) => {
        this.accommodation = response as Accommodation;
        this.editAccommodationFormGroup.get('name')?.setValue(this.accommodation?.name || '');
        this.editAccommodationFormGroup.get('address')?.setValue(this.accommodation?.location?.address || '');
        this.editAccommodationFormGroup.get('country')?.setValue(this.accommodation?.location?.country || '');
        this.editAccommodationFormGroup.get('city')?.setValue(this.accommodation?.location?.city || '');
        this.editAccommodationFormGroup.get('xCoordinate')?.setValue(this.accommodation?.location?.x || '');
        this.editAccommodationFormGroup.get('cancellationDeadline')?.setValue(this.accommodation?.cancellationDeadline || '');
        this.editAccommodationFormGroup.get('yCoordinate')?.setValue(this.accommodation?.location?.y || '');
        this.editAccommodationFormGroup.get('description')?.setValue(this.accommodation?.description || '');
        this.editAccommodationFormGroup.get('minGuests')?.setValue(this.accommodation?.minGuests || '');
        this.editAccommodationFormGroup.get('maxGuests')?.setValue(this.accommodation?.maxGuests|| '');

        this.setAmenitiesSelection();
        this.priceCards=this.accommodation.prices;
        this.dataSource = new MatTableDataSource<PriceCard>(this.accommodation.prices);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.cdr.detectChanges();
      },
      (error) => {
        console.error(error);
      }  
    );

  }

  setAmenitiesSelection() {
    const amenitiesControl = this.editAccommodationFormGroup.get('amenities');

  if (amenitiesControl && this.accommodation?.assets) {
    amenitiesControl.setValue(this.accommodation.assets);
  }
  }

  savePrice(){
    let priceTypeValueEnum=PriceTypeEnum.PERUNIT
    const priceTypeValue: PriceTypeEnum | undefined = this.editAccommodationFormGroup.get('priceType')?.value;
    if(priceTypeValue==0){
      priceTypeValueEnum=PriceTypeEnum.PERGUEST
    }
    if (priceTypeValue !== undefined) {
        const newTimeSlot={
          startDate:this.editAccommodationFormGroup.value.startDate,
          endDate:this.editAccommodationFormGroup.value.endDate,
        }
        const newPriceCard = {
            timeSlot:newTimeSlot,
            price: this.editAccommodationFormGroup.value.price,
            type: priceTypeValueEnum
        };
        this.priceCards.push(newPriceCard);
        // console.log(typeof(priceTypeValue));
        // console.log(priceTypeValue);
        // console.log(typeof(priceTypeValueEnum));
        // console.log(priceTypeValueEnum);
        //this.dataSource.data = this.priceCards;
    } 
  }

  onNameInput(event: any): void {
    this.editAccommodationFormGroup.get('name')?.setValue(event.target.value);
  }
  onDescriptionInput(event: any): void {
    this.editAccommodationFormGroup.get('description')?.setValue(event.target.value);
  }
  onMinGuestsInput(event: any): void {
    this.editAccommodationFormGroup.get('minGuests')?.setValue(event.target.value);
  }
  onMaxGuestsInput(event: any): void {
    this.editAccommodationFormGroup.get('maxGuests')?.setValue(event.target.value);
  }
  onCancellationDeadlineInput(event: any): void {
    this.editAccommodationFormGroup.get('cancellationDeadline')?.setValue(event.target.value);
  }
  onAddressInput(event: any): void {
    this.editAccommodationFormGroup.get('address')?.setValue(event.target.value);
  }
  onCountryInput(event: any): void {
    this.editAccommodationFormGroup.get('country')?.setValue(event.target.value);
  }
  onCityInput(event: any): void {
    this.editAccommodationFormGroup.get('city')?.setValue(event.target.value);
  }
  onXInput(event: any): void {
    this.editAccommodationFormGroup.get('xCoordinate')?.setValue(event.target.value);
  }
  onYInput(event: any): void {
    this.editAccommodationFormGroup.get('yCoordinate')?.setValue(event.target.value);
  }

  onAmenitiesInput(event: any): void {
    this.editAccommodationFormGroup.get('amenities')?.setValue(event.target.value);
  }
  onReservationConfirmationInput(event: any): void {
    this.editAccommodationFormGroup.get('reservationConfirmation')?.setValue(event.target.value);
  }
  onTypeInput(event: any): void {
    this.editAccommodationFormGroup.get('type')?.setValue(event.target.value);
  }

  openEditDialog(element: PriceCard): void {

    console.log(element)

  const dialogRef = this.dialog.open(EditPriceCardDialogComponent, {
    width: '800px', 
    data: {element:element}, 
  });

  dialogRef.afterClosed().subscribe((updatedElement: PriceCard) => {
    if (updatedElement) {
      console.log('Ažurirani element:', updatedElement);
      this.updatePriceCard(updatedElement);
    }
  });
}

updatePriceCard(updatedElement: PriceCard): void {
  const index = this.priceCards.findIndex((element) => element.id === updatedElement.id);

  if (index !== -1) {
    this.priceCards[index] = updatedElement;
    this.dataSource.data = this.priceCards;
  }
}

  // saveItem() {
  //   if (this.editedItem) {
  //     this.editedItem.timeSlot.startDate = this.editAccommodationFormGroup.get('startDateEdit')?.value;
  //     console.log(this.editAccommodationFormGroup.get('startDateEdit')?.value)
  //     this.editedItem.timeSlot.endDate = this.editAccommodationFormGroup.get('endDateEdit')?.value;
  //     this.editedItem.price = this.editAccommodationFormGroup.get('priceEdit')?.value;

  
  //     this.priceCardService.update(this.editedItem).subscribe(
  //       (response) => {
  //         console.log('Item updated successfully:', response);
  //         // this.editedItem = null;
  //       },
  //       (error) => {
  //         console.error('Error updating item:', error);
  //       }
  //     );
  //   }
  // }

  
  deleteItem(element: any) {
    console.log('Delete item:', element);
    const index = this.priceCards.indexOf(element);
    if (index !== -1) {
      this.priceCards.splice(index, 1);
    }
  }

  cancelEdit(element: any) {
    element.editing = false;
  }

  saveChanges(){
    // const reservationConfirmationValue: ReservationConfirmationEnum | undefined= this.editAccommodationFormGroup.get('reservationConfirmation')?.value;
    //   const reservationConfirmationEnum: ReservationConfirmationEnum = ReservationConfirmationEnum[reservationConfirmationValue as keyof typeof ReservationConfirmationEnum];
      const updatedAccommodation: AccommodationPutDTO = {
        name: this.editAccommodationFormGroup.value.name,
        description: this.editAccommodationFormGroup.value.description,
        location: {
          address: this.editAccommodationFormGroup.value.address,
          city: this.editAccommodationFormGroup.value.city,
          country: this.editAccommodationFormGroup.value.country,
          x: this.editAccommodationFormGroup.value.xCoordinate,
          y: this.editAccommodationFormGroup.value.yCoordinate
        },
        minGuests: this.editAccommodationFormGroup.value.minGuests,
        maxGuests: this.editAccommodationFormGroup.value.maxGuests,
        type: (this.editAccommodationFormGroup.value.type !== null && this.editAccommodationFormGroup.value.type !== undefined) ? this.editAccommodationFormGroup.value.type as AccommodationTypeEnum : null,
        assets: this.editAccommodationFormGroup.get('amenities')?.value,
        prices: this.priceCards,
        ownerId:this.ownerId,
        reservationConfirmation:(this.editAccommodationFormGroup.value.reservationConfirmation !== null && this.editAccommodationFormGroup.value.reservationConfirmation !== undefined) ? this.editAccommodationFormGroup.value.reservationConfirmation as ReservationConfirmationEnum : null,
        cancellationDeadline: this.editAccommodationFormGroup.value.cancellationDeadline,
        images: []
      };
      
      this.accommodationService.update(updatedAccommodation,this.accommodationId).subscribe({ });
      
      } 
    }


