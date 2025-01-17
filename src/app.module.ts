import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GeneralModule } from './general.module';
import { HttpRequestService } from './shared/requests/http-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './shared/configurations/typeorm.conf';

@Module({
  imports: [
    GeneralModule,
    ConfigModule.forRoot(),
    HttpModule.registerAsync({ useClass: HttpRequestService }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
