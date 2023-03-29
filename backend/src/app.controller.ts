import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ScrapeDto } from './scrape.dto';

@Controller('/scrape')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/ebay')
  scrapeInputProduct(@Body() body: ScrapeDto) {
    this.appService.scrapeEbayProduct(body.name);
    return {
      msg: 'Scrape Successfull',
    };
  }
}
