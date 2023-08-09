
import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { MessageType } from '@app/common/kafka/kafkajs.consumer';
import { ProjectServiceRepository } from '@app/repository';

@Injectable()
export class ApiUsageConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService,
    private readonly projectServiceRepository: ProjectServiceRepository) { }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: { topic: 'api-usage' },
        config: { groupId: 'test-consumer' },
        onMessage: async (message) => {
            console.log("Usage:", message.usage);
            // calculate(message.usage);
            // const usage = new Usage(message.usage);
            // const usageSave = await usage.save();
        },
        messageType: MessageType.JSON
      }
    );
  }
}
