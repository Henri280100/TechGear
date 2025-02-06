import { OrderItemsStatus } from "../enum/OrderItemsStatus";

export interface IOrderItems {
  id: number;
  itemsQuantity: number;
  itemsUnitPrice: number;
  orderId: number;
  productName: string;
  orderSummaryId: number;
  status: OrderItemsStatus;
  createdAt: string;
  lastUpdatedAt: string;
}
