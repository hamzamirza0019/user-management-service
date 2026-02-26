import { UserRole, UserStatus } from "./user.types.js";

export interface IUser{
    name:string;
    email:string;
    role:UserRole;
    status:UserStatus;
    createdAt:Date;
    updatedAt: Date;
}