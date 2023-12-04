import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatDialog } from '@angular/material/dialog';
import { AvailabilityCardComponent } from '../availability-card/availability-card.component';

@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatChipsModule,MatRadioModule,LayoutModule],
})
export class EditAccommodationComponent {
  constructor(public dialog: MatDialog) {}

    
}


