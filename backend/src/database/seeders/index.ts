import { AppDataSource } from '../datasource';
import { Seeder } from './seeder';
import { RoleSeeder } from './role.seeder';

async function bootstrap() {
  await AppDataSource.initialize();

  const seeders: Seeder[] = [
    new RoleSeeder(),
  ];

  for (const seeder of seeders) {
    await seeder.run();
  }

  await AppDataSource.destroy();
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('Seeder failed', err);
  process.exit(1);
});
