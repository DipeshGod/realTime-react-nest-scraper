import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { AppGateway } from './app.gateway';

@Injectable()
export class AppService {
  constructor(private appGateway: AppGateway) {}

  async scrapeEbayProduct(name: string): Promise<any> {
    this.appGateway.handleScrapingStarted(null, true);
    const response = await axios.get(
      `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${name}e&_sacat=0`,
    );
    const html = response.data;
    const $ = cheerio.load(html);

    //NOTIFY 1: get the title of the page
    const title = $('title').text();
    console.log('TITLE', title);

    //NOTIFY 2: get the number of search results
    const numberOfSearchResults = await $(
      '.srp-controls__count-heading span',
    ).text();
    this.appGateway.handleNumberOfResults(null, numberOfSearchResults);

    //get all items on the page
    const allItemsOnPage = $('.s-item');

    allItemsOnPage.each((index, element) => {
      const name = $(element).find('.s-item__title').text();
      const price = $(element).find('.s-item__price').text();

      //NOTIFY 3: each product
      this.appGateway.handleNewProduct(null, { name, price });
    });
  }
}
