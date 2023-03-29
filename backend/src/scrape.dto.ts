import { IsNotEmpty, IsString } from 'class-validator';

export class ScrapeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
