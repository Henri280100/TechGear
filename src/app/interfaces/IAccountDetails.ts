import { UserGenders } from "../enum/UserGenders";
import { UserTypes } from "../enum/UserTypes";

export interface IAccountDetails {
    accountDetailsId: number;
    userFirstName: string;
    userLastName: string;
    userTypes: UserTypes;
    genders: UserGenders;
    userDateOfBirth: Date;
    userProfileImage: string;
    userPhoneNo: string;
    userAddress: string;
}