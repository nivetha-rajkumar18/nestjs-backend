// src/mail/dto/send-mail.dto.ts
export class SendMailDto {
  to: string;
  subject: string;
  message: string;
  files?: {
    filename: string;
  };
}
