import puppeteer from 'puppeteer';

async function main() {
  console.time('Puppeteer Connect');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  // Wait for 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Close the browser
  await browser.close();
  console.timeEnd('Puppeteer Connect');
}

main().catch(err => console.error(err));