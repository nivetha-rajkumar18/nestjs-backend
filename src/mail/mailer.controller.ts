// src/mail/mailer.controller.ts
import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { MailerService } from '../mail/mailer.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('mail')
export class MailerController {
  constructor(private readonly mailService: MailerService) {
    if (
      !mailService ||
      typeof mailService.sendMailWithAttachments !== 'function'
    ) {
      throw new Error(
        'MailerService is not properly initialized or missing required method',
      );
    }
  }

  @Post('send')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/mail',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async sendMailwithAttachments(
    @Body() body: { to: string; subject: string; message: string },
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const result = await this.mailService.sendMailWithAttachments(
        body.to,
        body.subject,
        body.message,
        files,
      );
      return result;
    } catch (error) {
      console.error('MailerController Error:', error);
      throw new InternalServerErrorException('Failed to send email');
      // console.log('attachments', files);
    }
  }
}
