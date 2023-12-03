import { PriceTypeEnum } from "src/app/models/enums/priceTypeEnum"
export interface PriceCard{
    id:number,
    startDate:Date,
    endDate:Date,
    price:number,
    type:PriceTypeEnum
}