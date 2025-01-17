import {
  Global, Injectable,
} from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';

@Global()
@Injectable()
export class HttpRequestService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 150000,
      maxRedirects: 5,
    };
  }
}
