import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Users } from 'src/modules/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  entities: [Users],
  synchronize: true,
  ssl: true,     /* Descomentar si se desea probar con la base de datos en Render */
  //entities:['dist/**/*.entity{.ts,.js}'],
  //migrations: ['dist/migrations/*{.ts,.js}'],
  //logging: true,
  //dropSchema: true,
   ssl: {
    rejectUnauthorized: false,
  },
};
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
