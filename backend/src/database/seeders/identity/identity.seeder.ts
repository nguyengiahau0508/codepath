import { Seeder } from "../seeder";
import { RoleSeeder } from "./role.seeder";

export const IdentitySeeders : Seeder[] = [
    new RoleSeeder(),
];