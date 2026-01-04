import { User } from "../entities/users.entity";

export interface UserRepository{
    findOneByEmail(email:string): Promise<User| null>
}