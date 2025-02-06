import { ImageTypes } from "../enum/ImageTypes";
import { IImageDimensions } from "./IImageDimensions";

export interface IImage {
    id: number;
    imageUrl: string;
    publicId: number;
    type: ImageTypes;
    dimensions: IImageDimensions;
    createdAt: Date;
}