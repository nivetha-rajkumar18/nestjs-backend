// src/jobs/queue/task.producer.ts
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskProducer {
  constructor(@InjectQueue('task-queue') private taskQueue: Queue) {}

  async addTaskToQueue(taskData: any) {
    await this.taskQueue.add('process-task', taskData);
  }
}
