
import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessageType } from '@app/common/kafka/kafkajs.consumer';
import { uuid } from 'uuidv4';

import { ProjectServiceRepository, ServiceAccountRepository } from '@app/repository';


@Injectable()
export class CreateServiceAccountConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly serviceAccountRepository: ServiceAccountRepository
  ) { }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: { topic: 'create_service_account' },
        config: { groupId: 'test-consumer' },
        onMessage: async (message) => {
            // Perform some action
            // console.log(message);
            console.log("User:", message.user);
            const id = uuid();
            console.log("Id:", id);
            let service_account = await this.serviceAccountRepository.create({
                account_id: id,
                isActive: true,
                credits: 0
            });
            console.log(service_account);
        },
        messageType: MessageType.JSON
      }
    );
  }
}
