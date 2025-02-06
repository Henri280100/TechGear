import { PhoneNumberType } from "../enum/PhoneNumberType";

export interface IUserPhoneNo {
    id: number;
    accountDetailsId: number;
    type: PhoneNumberType;
    
}