import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CustomMailerModule } from './mail/mailer.module';
// import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
// import { TasksModule } from './modules/task.module';
import { MailerService } from './mail/mailer.service';
import { MailerController } from './mail/mailer.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nivethaait18:DailytasksDB@cluster0.5l2fsvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PostModule,
    AuthModule,
    UsersModule,
    ProductModule,
    CustomMailerModule,
  ],
  controllers: [MailerController],
  providers: [MailerService],
  exports: [MailerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
