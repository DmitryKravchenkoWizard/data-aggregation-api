import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnvVariable } from '../helpers/env-variables.helper';

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: getEnvVariable('POSTGRES_HOST'),
    port: parseInt(getEnvVariable('POSTGRES_PORT'), 10),
    username: getEnvVariable('POSTGRES_USER'),
    password: getEnvVariable('POSTGRES_PASSWORD'),
    database: getEnvVariable('POSTGRES_DATABASE'),
    entities: [`${__dirname}/../../**/**/**/*.entity{.ts,.js}`],
    synchronize: false,
    migrationsTableName: 'migrations',
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    keepConnectionAlive: true,
    ssl: false,
    logger: 'advanced-console',
  };
}
