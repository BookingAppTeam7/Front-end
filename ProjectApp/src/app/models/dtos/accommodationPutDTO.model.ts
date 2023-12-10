import { PriceCard } from "src/app/accommodation/accommodation/model/priceCard.model";
import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";
import { AccommodationTypeEnum } from "../enums/accommodationTypeEnum";
import { Location } from "src/app/accommodation/accommodation/model/location.model";
import { ReservationConfirmationEnum } from "../enums/reservationConfirmationEnum";

export interface AccommodationPutDTO {
    name: string;
    description: string;
    location:Location;
    minGuests: number;
    maxGuests: number;
    type:AccommodationTypeEnum | null;
    assets:String[];
    prices:PriceCard[];
    ownerId:String;
    reservationConfirmation:ReservationConfirmationEnum | null;
    cancellationDeadline:number;
    images:String[];
  }