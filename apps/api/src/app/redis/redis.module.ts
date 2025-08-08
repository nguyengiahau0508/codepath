import { config } from "@codepath/config";
import { Module, Global } from "@nestjs/common";
import Redis from "ioredis";

@Global()
@Module({
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: () => {
        return new Redis({
          host: config.redis.host,
          port: config.redis.port,
          password: config.redis.password
        });
      },
    },
  ],
  exports: ["REDIS_CLIENT"],
})
export class RedisModule { }

