
import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { MessageType } from '@app/common/kafka/kafkajs.consumer';
import { ProjectServiceRepository } from '@app/repository';


@Injectable()
export class ActivateService implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService,
    private readonly projectServiceRepository: ProjectServiceRepository) { }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: { topic: 'activate-service' },
        config: { groupId: 'test-consumer' },
        onMessage: async (message) => {
            const activateService = message;
            const userServiceObject = {
                    project_id: activateService.project_id,
                    service: activateService.service,
                    status: true,
                    isLimited: activateService.isLimited ? activateService.isLimited : true,
                    credits_alloted: activateService.credits_alloted ? activateService.credits_alloted : 0,
                    api_keys: [],
            };
            const userService = await this.projectServiceRepository.create(userServiceObject);
            console.log(userService);
        },
        messageType: MessageType.JSON
      }
    );
  }
}