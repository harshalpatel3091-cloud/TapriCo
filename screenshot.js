const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  // wait a bit for animations
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'local_screenshot.png' });
  await browser.close();
  console.log('Screenshot taken: local_screenshot.png');
})();
