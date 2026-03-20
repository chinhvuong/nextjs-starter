import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto('http://localhost:3000/landing', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);

// Check computed styles on section
const sectionInfo = await page.evaluate(() => {
  const section = document.querySelector('section');
  if (!section) return 'NO SECTION';
  const style = getComputedStyle(section);
  return {
    width: style.width,
    height: style.height,
    aspectRatio: style.aspectRatio,
    overflow: style.overflow,
    position: style.position,
    display: style.display,
    className: section.className,
    parentTag: section.parentElement?.tagName,
    parentWidth: getComputedStyle(section.parentElement).width,
    parentHeight: getComputedStyle(section.parentElement).height,
    childCount: section.children.length,
  };
});
console.log('Section:', JSON.stringify(sectionInfo, null, 2));

// Check slides track
const trackInfo = await page.evaluate(() => {
  const section = document.querySelector('section');
  const track = section?.firstElementChild;
  if (!track) return 'NO TRACK';
  const style = getComputedStyle(track);
  return {
    width: style.width,
    height: style.height,
    display: style.display,
    className: track.className.substring(0, 80),
  };
});
console.log('Track:', JSON.stringify(trackInfo, null, 2));

await page.screenshot({ path: '/tmp/landing-debug.png', fullPage: true });
console.log('Screenshot saved');
await browser.close();
