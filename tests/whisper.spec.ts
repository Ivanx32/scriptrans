import { test, expect } from '@playwright/test';

test.use({ browserName: 'webkit' });

test('whisper wasm loads', async ({ page }) => {
  const messages: string[] = [];
  page.on('console', msg => messages.push(msg.text()));
  await page.goto('http://localhost:4173/scriptrans/test-whisper.html');
  await expect.poll(() => messages.includes('wasm ready'), { timeout: 15000 }).toBe(true);
  await expect.poll(() => messages.includes('Model ok'), { timeout: 15000 }).toBe(true);
});
