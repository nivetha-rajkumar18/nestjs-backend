// src/jobs/jobs.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { TaskCron } from './crons/task.cron';
import { TaskProcessor } from './queues/task.processor';
import { TaskProducer } from './queues/task.producer';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'task-queue',
    }),
  ],
  providers: [TaskCron, TaskProcessor, TaskProducer],
  exports: [TaskProducer],
})
export class JobsModule {}
