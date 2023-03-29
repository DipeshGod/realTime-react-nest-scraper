import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ScrapeCourseDto } from './scrape.dto';

@Controller('/scrape')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/ebay')
  scrapeInputCourse(@Body() body: ScrapeCourseDto) {
    this.appService.scrapeEbayCourse(body.name);
    return {
      msg: 'Scrape Successfull',
    };
  }
}
