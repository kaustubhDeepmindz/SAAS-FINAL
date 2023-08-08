import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from 'kafkajs';
import { DatabaseService } from '../database/database.service';
import { IConsumer } from './consumer.interface';
import { KafkajsConsumer } from './kafkajs.consumer';

enum MessageType {
  JSON = 'json',
  STRING = 'string',
  NUMBER = 'number'
}

interface KafkajsConsumerOptions {
  topic: ConsumerSubscribeTopic;
  config: ConsumerConfig;
  onMessage: (message) => Promise<void>;
  messageType:MessageType
}



@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly databaserService: DatabaseService,
  ) {}

  async consume({ topic, config, onMessage, messageType }: KafkajsConsumerOptions) {
    const consumer = new KafkajsConsumer(
      topic,
      this.databaserService,
      config,
      this.configService.get('KAFKA_BROKER'),
      messageType
    );
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
