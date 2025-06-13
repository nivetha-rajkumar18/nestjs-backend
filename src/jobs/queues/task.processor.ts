// src/jobs/queue/task.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('task-queue')
export class TaskProcessor {
  private readonly logger = new Logger(TaskProcessor.name);

  @Process('process-task')
  async handleTask(job: Job) {
    this.logger.log(`Processing task with data: ${JSON.stringify(job.data)}`);
    // Do background task here
  }
}
