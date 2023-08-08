import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { MessageType } from '@app/common/kafka/kafkajs.consumer';
import { ProjectServiceRepository } from '@app/repository';

@Injectable()
export class ReactivateService implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService,
    private readonly projectServiceRepository: ProjectServiceRepository) { }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: { topic: 'reactivate-service' },
        config: { groupId: 'test-consumer' },
        onMessage: async (message) => {
          const reactivateService = message;
          const serviceDetails = await this.projectServiceRepository.findOne({ user: reactivateService.user, service: reactivateService.service });
          (serviceDetails?.status == false) ? serviceDetails.status = true : console.log("SERVICE ALREADY ACTIVE:", serviceDetails.status);
        },
        messageType: MessageType.JSON
      }
    );
  }
}