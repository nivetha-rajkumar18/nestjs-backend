import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { Express } from 'express';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendMailWithAttachments(
    to: string,
    subject: string,
    message: string,
    attachments?: Express.Multer.File[],
  ) {
    try {
      const formattedAttachments = (attachments || []).map((file) => ({
        filename: file.originalname,
        path: file.path, // full path where multer stores file
      }));

      await this.mailerService.sendMail({
        to,
        subject,
        text: message,
        attachments: formattedAttachments,
      });

      console.log('Attachments:', formattedAttachments);

      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('MailerService Error:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
