import fs from 'fs';
import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer';

// Step 1: Check for any .html file in the current directory
const files = await fs.promises.readdir('.');
const htmlFile = files.find(file => file.endsWith('.html'));
const filename = htmlFile || 'example.html';

let data;

if (htmlFile) {
  data = await fs.promises.readFile(filename, 'utf-8');
} else {
  data = await fetch('https://example.com').then(res => res.text());
  await fs.promises.writeFile(filename, data);
  console.log(`Fetched and saved as ${filename}`);
}

// Step 2: Parse HTML with JSDOM
const dom = new JSDOM(data);
const document = dom.window.document;
const firstLink = document.querySelector("a")?.href || 'No link found';
console.log('First link href:', firstLink);

// Step 3: Create a PDF using Puppeteer
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(data, { waitUntil: 'networkidle0' });
await page.pdf({ path: 'page.pdf', format: 'A4' });
await browser.close();

console.log('✅ PDF created: page.pdf');