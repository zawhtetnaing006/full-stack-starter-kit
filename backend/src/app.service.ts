import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail/mail.service';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private readonly mailService: MailService,
  ) {}
  healthCheck(): string {
    return `${this.configService.get('APP_NAME')} is ups and running`;
  }

  async mailHealthCheck() {
    return this.mailService.sendMail({
      subject: 'Health Check',
      to: this.configService.get('MAIL_FROM_ADDRESS'),
      text: `${this.configService.get('APP_NAME')} is ups and running`,
      from: this.configService.get('MAIL_FROM_ADDRESS'),
    });
  }
}
