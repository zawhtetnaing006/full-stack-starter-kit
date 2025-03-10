import { IsNumberString, IsOptional } from 'class-validator';

export class BaseListingDto {
  @IsNumberString()
  @IsOptional()
  page?: string = '1';

  @IsNumberString()
  @IsOptional()
  perPage?: string = '10';
}
