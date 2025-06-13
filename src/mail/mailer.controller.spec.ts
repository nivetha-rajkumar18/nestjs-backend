import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { InternalServerErrorException } from '@nestjs/common';
import { Readable } from 'stream';

describe('MailerController', () => {
  let controller: MailerController;
  // Removed unused variable mailerService

  const mockMailerService = {
    sendMailWithAttachments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
      providers: [
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    controller = module.get<MailerController>(MailerController);
    // Removed unused variable mailerService
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendMail()', () => {
    const body = {
      to: 'test@example.com',
      subject: 'Hello',
      message: '<b>Test email</b>',
    };

    const files: Express.Multer.File[] = [
      {
        originalname: 'test.pdf',
        filename: 'abc123.pdf',
        path: './uploads/mails/abc123.pdf',
        fieldname: 'file',
        encoding: '7bit',
        mimetype: 'application/pdf',
        stream: new Readable({ read() {} }), // Mock stream with safe construction
        destination: './uploads/mails',
        buffer: Buffer.from('mock data'), // Mock buffer
        size: 1024, // Mock size
      },
    ];

    it('should send email with attachments', async () => {
      const expectedResult = { message: 'Email sent successfully' };
      mockMailerService.sendMailWithAttachments.mockResolvedValue(
        expectedResult,
      );

      const result = await controller.sendMailwithAttachments(body, files);

      expect(result).toEqual(expectedResult);
      expect(mockMailerService.sendMailWithAttachments).toHaveBeenCalledWith(
        body.to,
        body.subject,
        body.message,
        expect.arrayContaining([
          expect.objectContaining({
            filename: 'test.pdf',
            path: expect.stringContaining('abc123.pdf') as string,
          }),
        ]),
      );
    });

    it('should throw InternalServerErrorException on failure', async () => {
      mockMailerService.sendMailWithAttachments.mockRejectedValue(
        new Error('SMTP error'),
      );

      await expect(
        controller.sendMailwithAttachments(body, files),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
