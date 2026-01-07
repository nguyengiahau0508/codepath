import { RoleEnum } from "../enums/role.enum";

export interface ICurrentUser {
    id: number;
    email: string;
    username: string;
    roles: RoleEnum[];
}