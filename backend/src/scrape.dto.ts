import { IsNotEmpty, IsString } from 'class-validator';

export class ScrapeCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
