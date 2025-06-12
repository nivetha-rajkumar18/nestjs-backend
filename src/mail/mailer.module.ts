import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'nivethaait18@gmail.com',
          pass: 'ygwlvokncdpxiweh',
        },
      },
    }),
  ],
  providers: [MailerService],
  controllers: [MailerController],
  exports: [MailerService],
})
export class CustomMailerModule {}
