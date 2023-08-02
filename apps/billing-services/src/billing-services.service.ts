import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingServicesService {
  getHello(): string {
    return 'Hello World!';
  }
}
