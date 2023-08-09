import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {Cache } from 'cache-manager';
import { MessageType } from '@app/common/kafka/kafkajs.consumer';
import { ProjectServiceRepository } from '@app/repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ActivateServiceKeys implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) private redisClient: Cache,
    private readonly consumerService: ConsumerService,
    private readonly projectServiceRepository: ProjectServiceRepository
  ) { }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: { topic: 'service_keys_activate' },
        config: { groupId: 'test-consumer' },
        onMessage: async (message) => {
          const activateKeys = message;
          const config = {
            user_id: activateKeys.user,
            credits: 150
          };
          // console.log(config);
          await this.redisClient.set(activateKeys.keys.key_id, JSON.stringify(config));
          const saved = await this.redisClient.get(activateKeys.key_id);
          console.log(saved.toString())
          console.log("STORED TO REDIS SERVER");
        },
        messageType: MessageType.JSON
      }
    );
  }
}