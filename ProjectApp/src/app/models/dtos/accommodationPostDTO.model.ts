import { PriceCard } from "src/app/accommodation/accommodation/model/priceCard.model";
import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";
import { AccommodationTypeEnum } from "../enums/accommodationTypeEnum";

export interface AccommodationPostDTO {
    name: string;
    description: string;
    type:AccommodationTypeEnum;
    address: string;
    city:string;
    country:string;
    xCoordinate:string;
    yCoordinate:string;
    minGuests: number;
    maxGuests: number;
    images:String[];
    prices:PriceCard[];
    availability:TimeSlot[];
  }