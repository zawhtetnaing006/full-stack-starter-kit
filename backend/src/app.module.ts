import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ValidationSchema } from './config-validationSchema';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notification/notification.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    PrismaModule,
    NotificationModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
