import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('mail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async sendMailwithAttachments(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('message') message: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.mailerService.sendMailWithAttachments(
      to,
      subject,
      message,
      files,
    );
  }
}
