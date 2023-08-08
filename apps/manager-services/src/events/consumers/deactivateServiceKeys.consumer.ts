import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { MessageType } from '@app/common/kafka/kafkajs.consumer';
import { ProjectServiceRepository } from '@app/repository';

@Injectable()
export class DeactivateServiceKeys implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService,
    private readonly projectServiceRepository: ProjectServiceRepository) { }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: { topic: 'service_keys_deactivate' },
        config: { groupId: 'test-consumer' },
        onMessage: async (message) => {
            const deactivateKey = message;
    
            await redisClient.del(deactivateKey.key_id)
            console.log(`DELETED KEY ${deactivateKey.key_id} TO REDIS SERVER`);
            // calculate(message);
        },
        messageType: MessageType.JSON
      }
    );
  }
}
