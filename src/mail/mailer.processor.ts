/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';

@Processor('mail')
export class MailProcessor {
  @Process('sendEmail')
  async handleSendEmail(job: Job) {
    const { to, subject, body } = job.data;

    if (!to || !subject || !body) {
      console.error('Missing email data:', job.data);
      return;
    }

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
