import { InvoiceStatus } from "../enum/InvoiceStatus";

export interface IInvoice {
  invoiceId: number;
  status: InvoiceStatus;
  invoiceNumber: string;
  issueDate: Date;
  totalAmount: number;
}
