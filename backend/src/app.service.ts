import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class AppService {
  async scrapeEbayCourse(courseName: string): Promise<any> {
    const response = await axios.get(
      `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${courseName}&_sacat=0`,
    );
    const html = response.data;
    const $ = cheerio.load(html);

    //get the title of the page
    const title = $('title').text();
    console.log('TITLE', title);

    //get the number of search results
    const numberOfSearchResults = await $(
      '.srp-controls__count-heading span',
    ).text();
    console.log('NOSR', numberOfSearchResults);
  }
}
