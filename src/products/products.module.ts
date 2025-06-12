import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

// Ensure the correct path to LoggerMiddleware
import { LoggerMiddleware } from '../common/middleware/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nivethaait18:DailytasksDB@cluster0.5l2fsvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
