import Big from "big.js";

export interface IWishlistItems {
    id: number;
    productId: number;
    price: Big;
    notes: string;
}