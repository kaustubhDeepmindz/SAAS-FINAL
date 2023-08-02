import { Test, TestingModule } from '@nestjs/testing';
import { BillingServicesController } from './billing-services.controller';
import { BillingServicesService } from './billing-services.service';

describe('BillingServicesController', () => {
  let billingServicesController: BillingServicesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingServicesController],
      providers: [BillingServicesService],
    }).compile();

    billingServicesController = app.get<BillingServicesController>(BillingServicesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingServicesController.getHello()).toBe('Hello World!');
    });
  });
});
