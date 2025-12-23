import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import { DatabaseModule } from './infrastructure/database/typeorm.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { AllModule } from './modules/all.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    QueueModule,
    AllModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
