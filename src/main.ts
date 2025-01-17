import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import { getEnvVariable } from './shared/helpers/env-variables.helper';
import { ROUTES } from './shared/configurations/routes';
import { Logger } from '@nestjs/common';
import { getTypeOrmConfig } from './shared/configurations/typeorm.conf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('GlobalErrorHandler');

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization, authorization, Proxy-Authenticate',
    exposedHeaders: 'Content-Type, Accept, Authorization, authorization, Proxy-Authenticate',
  });

  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  app.setGlobalPrefix(ROUTES.GLOBAL);

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error.message);
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, authorization, Proxy-Authenticate');
    res.header('Access-Control-Expose-Headers', 'Content-Type, Accept, Authorization, authorization, Proxy-Authenticate');
    next();
  });

  getTypeOrmConfig();

  await app.listen(+getEnvVariable('PORT'));
}
bootstrap();
