import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
await page.goto('file://' + path.join(__dirname, 'index.html'));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

for (let i = 1; i <= 5; i++) {
  const el = await page.$(`#slide-${i}`);
  await el.screenshot({ path: path.join(__dirname, 'output', `slide-${i}.png`) });
  console.log(`slide-${i}.png done`);
}

await browser.close();
