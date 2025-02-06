import { OrderStatus } from "../enum/OrderStatus";
import Big from 'big.js';

export interface IOrderSummary {
    orderSummaryId: number;
    orderDate: Date;
    orderStatus: OrderStatus;
    subTotal: number;    
    totalAmount: Big;
    currency: string;
    notes: string;
}