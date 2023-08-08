import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopic,
  Kafka,
  KafkaMessage,
} from 'kafkajs';
import * as retry from 'async-retry';
import { sleep } from '../utils/sleep';
import { IConsumer } from './consumer.interface';
import { DatabaseService } from '../database/database.service';



export enum MessageType {
  JSON = 'json',
  STRING = 'string',
  NUMBER = 'number'
}


export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  private readonly messageType: MessageType;

  constructor(
    private readonly topic: ConsumerSubscribeTopic,
    private readonly databaseService: DatabaseService,
    config: ConsumerConfig,
    broker: string,
    messageType: MessageType
  ) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer(config);
    this.messageType = messageType

    this.logger = new Logger(`${topic.topic}-${config.groupId}`);
  }

  async consume(onMessage: (message) => Promise<void>) {
    await this.consumer.subscribe(this.topic);
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partition: ${partition}`);
        try {
          await retry(async () => {
            let parsedMessage = this.parseMessage(message);
            onMessage(parsedMessage);
          }, 
          {
            retries: 3,
            onRetry: (error, attempt) =>
              this.logger.error(
                `Error consuming message, executing retry ${attempt}/3...`,
                error,
              ),
          });
        } catch (err) {
          this.logger.error(
            'Error consuming message. Adding to dead letter queue...',
            err,
          );
          await this.addMessageToDlq(message);
        }
      },
    });
  }

  private async parseMessage(MessageBuffer:KafkaMessage) {
    let parsedString = MessageBuffer.toString();
    let parsedObject = JSON.parse(parsedString);
    let message = parsedObject.value;
  
    this.logger.debug("___________________Message Received___________________")
    this.logger.debug("MESSAGE: ------->", message);

    switch (this.messageType) {
      case "json": message = JSON.parse(message);
        break;
      case "number": message = parseInt(message);
        break;
    }
    return message;
  }


  private async addMessageToDlq(message: KafkaMessage) {
    await this.databaseService
      .getDbHandle()
      .collection('dlq')
      .insertOne({ value: message.value, topic: this.topic.topic });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
