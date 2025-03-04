import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class Transporter {
  private transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('MAIL_PASSWORD');

    const config: nodemailer.TransportOptions = {
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<string>('MAIL_PORT'),
    };

    if (user && pass) {
      config['auth'] = {
        user,
        pass,
      };
    }

    this.transporter = nodemailer.createTransport(config);
  }

  getTransporter() {
    return this.transporter;
  }
}
