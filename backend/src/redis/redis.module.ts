import { Module, OnModuleInit, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
@Injectable()
export class RedisService implements OnModuleInit {
  private pubClient;
  private subClient;

  constructor(private configService: ConfigService) {}
  async onModuleInit() {
    const redisUrl = `${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`;
    this.pubClient = createClient({
      url: redisUrl,
    });
    this.subClient = createClient({
      url: redisUrl,
    });

    await Promise.all([this.pubClient.connect(), this.subClient.connect()]);
    this.subClient.subscribe('livechat', (message) => {
      console.log(`Received message from Redis: ${message}`);
    });
  }
  async publish(channel: string, message: string) {
    await this.pubClient.publish(channel, message);
  }
}

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
