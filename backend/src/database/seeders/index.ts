import { AppDataSource } from '../datasource';
import { Seeder } from './seeder';
import { IdentitySeeders } from './identity/identity.seeder';

async function bootstrap() {
  await AppDataSource.initialize();

  const seeders: Seeder[] = [];
  seeders.push(...IdentitySeeders);

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
