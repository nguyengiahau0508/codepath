

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { config } from '@codepath/config';
import { DataSource } from 'typeorm';
import Redis from 'ioredis';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ====== Swagger Config ======
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CodePath API')
    .setDescription('API documentation for CodePath backend')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // Tên này sẽ dùng trong @ApiBearerAuth()
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  });
  Logger.log(`📄 Swagger running at http://localhost:${config.api.port}/api/docs`);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = config.api.port;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  // ===== Database connection check =====
  const dataSource = app.get(DataSource);
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    Logger.log(
      `✅ Database connected successfully at ${config.database.host}:${config.database.port} (DB: ${config.database.name})`
    );
  } catch (error) {
    Logger.error('❌ Database connection failed', error);
  }

  // ===== Redis connection check =====
  const redis = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password || undefined,
    db: config.redis.db || 0,
  });

  redis.on('connect', () => {
    Logger.log(
      `✅ Redis connected successfully at ${config.redis.host}:${config.redis.port} (DB: ${config.redis.db})`
    );
  });

  redis.on('error', (err) => {
    Logger.error(`❌ Redis connection failed: ${err.message}`);
  });
}

bootstrap();

