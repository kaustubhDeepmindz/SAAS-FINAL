
import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessageType } from '@app/common/kafka/kafkajs.consumer';

import { UserRepository } from '@app/repository';

@Injectable()
export class NewUserConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly userRepository: UserRepository
  ) { }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: { topic: 'new-user' },
        config: { groupId: 'test-consumer' },
        onMessage: async (message) => {
            // Perform some action
            console.log(message);
            console.log("NEW REGISTERED User:", message.user);
            try{
                let user = await this.userRepository.create({
                    ...message.user,
                    hasServiceAccount: false
                });
            }
            catch(err){
                console.log(err);
            }

        },
        messageType: MessageType.JSON
      }
    );
  }
}
