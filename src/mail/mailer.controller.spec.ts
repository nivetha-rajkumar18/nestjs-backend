import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('MailerController', () => {
  let controller: MailerController;
  let mockMailerService: {
    sendMailWithAttachments: jest.Mock;
  };

  beforeEach(async () => {
    mockMailerService = {
      sendMailWithAttachments: jest.fn(),
    };

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send mail with attachments successfully', async () => {
    const body = {
      to: 'test@example.com',
      subject: 'Hello',
      message: 'This is a test email',
    };

    const files: Array<{
      originalname: string;
      buffer: Buffer;
      mimetype: string;
      size: number;
      fieldname: string;
      encoding: string;
      destination: string;
      filename: string;
      path: string;
      stream: any;
    }> = [
      {
        originalname: 'test.txt',
        buffer: Buffer.from('Hello world'),
        mimetype: 'text/plain',
        size: 1024,
        fieldname: 'attachments',
        encoding: '7bit',
        destination: '',
        filename: '',
        path: '',
        stream: null,
      },
    ];

    mockMailerService.sendMailWithAttachments.mockResolvedValueOnce(
      'Mock result',
    );

    const result = await controller.sendMailwithAttachments(
      body.to,
      body.subject,
      body.message,
      files,
    );

    expect(result).toEqual({
      message: 'Email sent successfully',
      result: 'Mock result',
    });

    expect(mockMailerService.sendMailWithAttachments).toHaveBeenCalledWith(
      body.to,
      body.subject,
      body.message,
      files,
    );
  });

  it('should throw InternalServerErrorException on failure', async () => {
    const body = {
      to: 'fail@example.com',
      subject: 'Fail',
      message: 'This should fail',
    };

    const files = [];

    mockMailerService.sendMailWithAttachments.mockRejectedValueOnce(
      new Error('Mock failure'),
    );

    await expect(
      controller.sendMailwithAttachments(
        body.to,
        body.subject,
        body.message,
        files,
      ),
    ).rejects.toThrow(InternalServerErrorException);

    expect(mockMailerService.sendMailWithAttachments).toHaveBeenCalledWith(
      body.to,
      body.subject,
      body.message,
      files,
    );
  });
});
