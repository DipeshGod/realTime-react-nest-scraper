import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ScrapeCourseDto } from './scrape.dto';

@Controller('/scrape')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/course')
  scrapeInputCourse(@Body() body: ScrapeCourseDto) {
    console.log('body', body);
    return {
      msg: 'Scrape Successfull',
    };
  }
}
