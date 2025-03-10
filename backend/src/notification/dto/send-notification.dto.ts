import { IsString } from 'class-validator';

export class EmailNotificationDto {
  from: string;
  to: string;
  subject: string;
  text?: string;
  templatePath?: string;
  templateData?: Record<string, any>;
}

export class PushNotificationDto {
  deviceTokens: string[];
  title: string;
  message: string;
  image?: string;
}

export class SendNotificationDto {
  email?: EmailNotificationDto;
  push?: PushNotificationDto;
}

export class TestPushNotificationDto {
  @IsString()
  deviceToken: string;
}
