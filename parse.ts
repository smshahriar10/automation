import fs from 'fs';

const exists = await fs.promises.access('example.html', fs.constants.F_OK)
  .then(() => true).catch(() => false);
let data;
if (exists) {
  data = await fs.promises.readFile('example.html', 'utf-8');
} else {
  data = await fetch('https://example.com')
    .then(response => response.text());
  fs.promises.writeFile('example.html', data);
}

import { JSDOM } from 'jsdom';
const dom = new JSDOM(data);
const document = dom.window.document;
console.log(document.querySelector("a").href);

import puppeteer from 'puppeteer';
const browser = await puppeteer.launch();
const page = await browser.newPage();
console.log(await page.evaluate(() => document.querySelector('h1')?.innerText));
await page.close();
await browser.close();