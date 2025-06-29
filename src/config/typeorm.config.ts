import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 4332,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // برای production همیشه false باشه
};
