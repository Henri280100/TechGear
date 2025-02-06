import { OrderStatus } from "../enum/OrderStatus";

export interface IOrder {
    orderId: number;
    orderStatus: OrderStatus;
    orderDate: Date;
    updatedAt: Date;
    paymentId: number;
    shipperId: number;
    invoiceId: number;
    accountId: number;
}