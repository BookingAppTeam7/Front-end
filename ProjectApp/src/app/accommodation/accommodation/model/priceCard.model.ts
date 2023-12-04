import { PriceTypeEnum } from "src/app/models/enums/priceTypeEnum"
import { TimeSlot } from "./timeSlot.model"
export interface PriceCard{
    timeSlot:TimeSlot
    price:number,
    type:PriceTypeEnum
}