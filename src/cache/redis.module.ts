import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import Redis, { Redis as RedisClient, RedisOptions } from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (): RedisClient => {
        const options: RedisOptions = {
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: Number(process.env.REDIS_PORT) || 6379,
        };

        let client: RedisClient;
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          client = new Redis(options);
        } catch (err) {
          throw new Error(
            'Redis initialization failed: ' + (err as Error).message,
          );
        }
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule implements OnModuleDestroy {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClient,
  ) {}

  async onModuleDestroy() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.redisClient.quit();
  }
}
