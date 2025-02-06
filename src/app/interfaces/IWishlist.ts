import Big from "big.js";
import { IImage } from "./IImage";
import { IWishlistItems } from "./IWishlistItems";

export interface IWishlist {
    wishlistId: number;
    wishlistDescription: string;
    createdDate: string;
    lastUpdatedDate: string;
    totalValue: Big;
    priority: number;
    image?: IImage;
    notifySale: boolean;
    items: IWishlistItems[];
}