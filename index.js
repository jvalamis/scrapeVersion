const puppeteer = require('puppeteer');

const url = 'https://docs.oracle.com/en/middleware/standalone/weblogic-server/';
const element =
  'body > div.ohc-grid > main > div > div > div > article > div.section.row > div:nth-child(1) > div > ul > li:nth-child(1) > a';

const scrapeVersion = async () => {
  let browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    devTools: false,
  });

  let page = await browser.newPage();

  await page.goto(`${url}`, { waitUntil: 'domcontentloaded' });

  const targetString = await page.$eval(element, (e) => e.innerHTML);

  const version = targetString.replace(/\([^()]*\)/g, '');

  await browser.close();
};

scrapeVersion();
