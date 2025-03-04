import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Post('mail/healthcheck')
  mailHealthCheck() {
    return this.appService.mailHealthCheck();
  }
}
