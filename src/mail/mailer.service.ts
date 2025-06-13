// src/mail/mailer.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendMailWithAttachments(
    to: string,
    subject: string,
    html: string,
    attachments: Express.Multer.File[],
  ) {
    try {
      const formattedAttachments = attachments.map((file) => ({
        filename: file.originalname,
        path: file.path,
        contentType: file.mimetype,
      }));

      await this.mailerService.sendMail({
        to,
        subject,
        html,
        attachments: formattedAttachments,
      });

      return { message: 'Email sent successfully' };
    } catch {
      throw new InternalServerErrorException('Failed to send email');
      // console.log('Sending email to:', to);
      // console.log('Attachments:', attachments);
    }
  }
}
