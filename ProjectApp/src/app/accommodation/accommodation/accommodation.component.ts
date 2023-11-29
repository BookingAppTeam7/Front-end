import { Component, Input } from '@angular/core';
import { Accommodation } from './model/accommodation.model';


@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
})
export class AccommodationComponent {
  @Input() 
  accommodation:Accommodation;

}
