import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

// utils
import { withErrorHandler } from '@utils/with-error-handler';

// libs
import { getOptions } from '@lib/options';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { darkMode, type, width, height } = req.query;

    if (!(type === 'png' || type === 'jpeg')) return res.status(403).end();

    const options = await getOptions(process.env.NODE_ENV === 'development');

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();
    //set size
    await page.setViewport({ width: Number(width), height: Number(height) });

    await page.goto(
      `${
        process.env.NODE_ENV === 'production'
          ? 'https://dynamic.jjong.co.kr'
          : 'http://localhost:3000'
      }?darkMode=${darkMode}&width=${width}&height=${height}`,
    );

    await page.waitForSelector('#image'); // wait for the selector to load
    const element = await page.$('#image'); // declare a variable with an ElementHandle
    if (!element) {
      console.log('error');
      return res.status(404).end();
    }
    const file = await element.screenshot({ type });

    await browser.close();

    return res.send(file);
  }
};

export default withErrorHandler(handler);
