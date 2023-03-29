import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class AppService {
  async scrapeCourserCourse(courseName: string): Promise<any> {
    const response = await axios.get(
      `https://www.coursera.org/search?query=${courseName}`,
    );
    const html = response.data;
    const $ = cheerio.load(html);

    //get the title of the page
    const title = $('title').text();
    console.log('TITLE', title);
  }
}
