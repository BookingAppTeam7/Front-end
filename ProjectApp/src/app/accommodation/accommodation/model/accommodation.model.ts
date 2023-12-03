import { PriceCard } from "./priceCard.model";
import { TimeSlot } from "./timeSlot.model";
import { AccommodationTypeEnum } from "src/app/models/enums/accommodationTypeEnum";
import { Location } from "./location.model";
export interface Accommodation{
    id?: number;
    name: string;
    description: string;
    type:AccommodationTypeEnum;
    location:Location
    minGuests: number;
    maxGuests: number;
    status: string;
    images:String[];
    prices:PriceCard[];
    availability:TimeSlot[];
}