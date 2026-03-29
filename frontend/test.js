let puppeteer;

try {
  ({ default: puppeteer } = await import('puppeteer'));
} catch {
  console.error('PUPPETEER LOAD ERROR: "puppeteer" is not installed. Install it in frontend and rerun this script.');
  process.exit(1);
}

const TARGET_URL = 'http://localhost:5173';

const browser = await puppeteer.launch({ headless: true });

try {
  const page = await browser.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });

  page.on('pageerror', (error) => {
    console.log('PAGE ERROR:', error?.stack || error?.message || String(error));
  });

  page.on('requestfailed', (req) => {
    const failure = req.failure();
    console.log('REQUEST FAILED:', req.url(), failure?.errorText || 'Unknown request failure');
  });

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 20000 });
    console.log('PAGE LOAD: success');
  } catch (err) {
    console.log('LOAD ERROR:', err?.stack || err?.message || String(err));
  }
} finally {
  await browser.close();
}
