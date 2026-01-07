import { Seeder } from './seeder';
import { AppDataSource } from '../datasource';
import { RoleEnum } from 'src/modules/identity/enums/role.enum';
import { Role } from 'src/modules/identity/entities/roles.entity';



export class RoleSeeder implements Seeder {
  async run(): Promise<void> {
    const roleRepository = AppDataSource.getRepository(Role);

    const roles: RoleEnum[] = [
      RoleEnum.Admin,
      RoleEnum.Teacher,
      RoleEnum.Student,
    ];

    for (const code of roles) {
      const exists = await roleRepository.findOne({
        where: { code },
      });

      if (exists) {
        continue;
      }

      const role = roleRepository.create({ code });
      await roleRepository.save(role);
    }

    console.log('Role seeding completed');
  }
}
