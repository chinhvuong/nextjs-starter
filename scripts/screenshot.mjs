/**
 * Take a screenshot of a local page for visual comparison.
 * Usage: node scripts/screenshot.mjs [url] [output-path] [--width=1600] [--full-page]
 */
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const url = args.find(a => !a.startsWith('--')) || 'http://localhost:3000';
const output = args.filter(a => !a.startsWith('--'))[1] || '/tmp/screenshot.png';
const width = parseInt(args.find(a => a.startsWith('--width='))?.split('=')[1] || '1600');
const fullPage = args.includes('--full-page');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height: 900 } });

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000); // let images/fonts load

  await page.screenshot({ path: output, fullPage });
  console.log(`Screenshot saved: ${output}`);

  await browser.close();
}

main().catch(e => { console.error(e.message); process.exit(1); });
