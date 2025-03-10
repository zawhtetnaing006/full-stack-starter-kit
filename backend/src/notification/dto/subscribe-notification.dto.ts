import { IsString } from 'class-validator';

export class SubscribeNotificationDto {
  @IsString()
  deviceToken: string;
}
