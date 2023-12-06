import { PriceCard } from "src/app/accommodation/accommodation/model/priceCard.model";
import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";
import { AccommodationTypeEnum } from "../enums/accommodationTypeEnum";
import { Location } from "src/app/accommodation/accommodation/model/location.model";

export interface AccommodationPostDTO {
    name: string;
    description: string;
    location:Location;
    minGuests: number;
    maxGuests: number;
    type:AccommodationTypeEnum;
    assets:String[];
    prices:PriceCard[];
    ownerId:String;
    cancellationDeadline:number;
    images:String[];
  }