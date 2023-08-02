import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerServicesService {
  getHello(): string {
    return 'Hello World!';
  }
}
