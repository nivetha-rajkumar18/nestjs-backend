import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

describe('MailerService', () => {
  let service: MailerService;
  let mockMailer: NestMailerService;

  beforeEach(async () => {
    const mockMailerProvider = {
      provide: NestMailerService,
      useValue: {
        sendMail: jest.fn((): void => {}),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService, mockMailerProvider],
    }).compile();

    service = module.get<MailerService>(MailerService);
    mockMailer = module.get<NestMailerService>(NestMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send email successfully', async () => {
    (mockMailer.sendMail as jest.Mock).mockResolvedValueOnce({});

    const result = await service.sendMailWithAttachments(
      'test@example.com',
      'Test Subject',
      '<p>Test Email</p>',
      [],
    );

    expect(result).toEqual({ message: 'Email sent successfully' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockMailer.sendMail).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test Email</p>',
      attachments: [],
    });
  });

  it('should throw error if sendMail fails', async () => {
    (mockMailer.sendMail as jest.Mock).mockRejectedValueOnce(
      new Error('Mock error'),
    );

    await expect(
      service.sendMailWithAttachments(
        'test@example.com',
        'Test Subject',
        '<p>Test Email</p>',
        [],
      ),
    ).rejects.toThrow('Failed to send email');
  });
});
