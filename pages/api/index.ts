import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer'
import { withErrorHandler } from '@utils/with-error-handler';
import { getOptions } from '@lib/options';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const {darkMode} = req.query

    const options = await getOptions(process.env.NODE_ENV==='development');
    
    const browser = await puppeteer.launch(options)

    const page = await browser.newPage();
    //set size
    await page.setViewport({width:2048,height:1170})
    
    await page.goto(`https://dynamic.jjong.co.kr?darkMode=${darkMode}`);

    await page.waitForSelector('#image');          // wait for the selector to load
    const element = await page.$('#image');        // declare a variable with an ElementHandle
    if(!element) {
      console.log('error')
      return res.status(404).end()
    }
    const file = await element.screenshot({ type:'png' });
  
    await browser.close();

    return res.send(file);
  }
};

export default withErrorHandler(handler);
