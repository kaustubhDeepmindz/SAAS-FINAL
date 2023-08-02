import { Test, TestingModule } from '@nestjs/testing';
import { ManagerServicesController } from './manager-services.controller';
import { ManagerServicesService } from './manager-services.service';

describe('ManagerServicesController', () => {
  let managerServicesController: ManagerServicesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ManagerServicesController],
      providers: [ManagerServicesService],
    }).compile();

    managerServicesController = app.get<ManagerServicesController>(ManagerServicesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(managerServicesController.getHello()).toBe('Hello World!');
    });
  });
});
