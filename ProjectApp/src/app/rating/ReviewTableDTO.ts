import { PriceCard } from "src/app/accommodation/accommodation/model/priceCard.model";
import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";

import { Location } from "src/app/accommodation/accommodation/model/location.model";
import { Review } from "../accommodation/accommodation/model/review.model";

export interface ReviewTableDTO {
    ownerId: string;
    accommodationId:number;
    numOfReviews:number;
    reviews: Review[];
  }