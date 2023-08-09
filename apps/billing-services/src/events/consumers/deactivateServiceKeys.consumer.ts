import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import  {Cache} from 'cache-manager';
import { MessageType } from '@app/common/kafka/kafkajs.consumer';
import { ProjectServiceRepository } from '@app/repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';


@Injectable()
export class DeactivateServiceKeys implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) private redisClient: Cache,
    private readonly consumerService: ConsumerService,
    private readonly projectServiceRepository: ProjectServiceRepository
  ) { }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: { topic: 'service_keys_deactivate' },
        config: { groupId: 'test-consumer' },
        onMessage: async (message) => {
          const deactivateKey = message;

          await this.redisClient.del(deactivateKey.key_id)
          console.log(`DELETED KEY ${deactivateKey.key_id} TO REDIS SERVER`);
          // calculate(message);
        },
        messageType: MessageType.JSON
      }
    );
  }
}
