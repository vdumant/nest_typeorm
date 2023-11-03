import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config(); //busca archivo .env

export const AppDataSource = new DataSource({
  // type: 'postgres',
  // url: process.env.DATABASE_URL,
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
