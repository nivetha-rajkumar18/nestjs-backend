// src/jobs/cron/task.cron.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskCron {
  private readonly logger = new Logger(TaskCron.name);

  // Runs every minute
  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.logger.log('Running scheduled task every minute');

}
}
