import { Injectable, Logger } from '@nestjs/common';
import { Transporter } from './mail.transporter';
import { MailDto } from './mail.dto';
import * as ejs from 'ejs';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly transporter: Transporter,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(mailDto: MailDto) {
    const transport = this.transporter.getTransporter();
    let htmlContent = mailDto.text;
    const textContent = mailDto.text;

    if (mailDto.templatePath && mailDto.templateData) {
      htmlContent = await this.renderTemplate(
        mailDto.templatePath,
        mailDto.templateData,
      );
    }

    try {
      await transport.sendMail({
        from:
          mailDto.from || this.configService.get<string>('MAIL_FROM_ADDRESS'),
        to: mailDto.to,
        subject: mailDto.subject,
        text: textContent,
        html: htmlContent,
      });

      this.logger.log(`Email successfully sent to ${mailDto.to}`);
    } catch (error) {
      this.logger.error(
        `Error sending email to ${mailDto.to}: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to send email to ${mailDto.to}`);
    }
  }

  async renderTemplate(
    templateRelativePath: string,
    templateData: Record<string, any>,
  ): Promise<string> {
    try {
      const templatePath = path.resolve(
        process.cwd(),
        'src/mail-templates',
        templateRelativePath,
      );

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template not found: ${templatePath}`);
      }

      return await ejs.renderFile(templatePath, templateData);
    } catch (error) {
      this.logger.error(
        `Error rendering email template: ${templateRelativePath}`,
        error.stack,
      );
      throw new Error(
        `Failed to render email template: ${templateRelativePath}`,
      );
    }
  }
}
