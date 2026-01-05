import { User } from "../entities/users.entity";

export interface UserRepository{
    create(user:Partial<User>): Promise<User>
    save(user:User): Promise<User>
    update(user: User): Promise<User>
    findOneByEmail(email:string): Promise<User| null>
}