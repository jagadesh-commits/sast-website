import { chromium } from "playwright";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log("[products-check]", ...a);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
const result = {};

try {
  await page.goto("http://localhost:3000/products", { waitUntil: "networkidle" });
  await sleep(3500);

  result.calcButtons = await page.getByRole("link", { name: /Calculate Weight & Price/i }).count();
  result.disclaimers = await page.getByText("* Prices may vary daily. Contact us for exact pricing.").count();
  result.requestQuoteButtons = await page.getByRole("button", { name: /Request Quote/i }).count();

  // Check a couple of hrefs
  const hrefs = await page.getByRole("link", { name: /Calculate Weight & Price/i }).evaluateAll((els) =>
    els.map((e) => e.getAttribute("href")),
  );
  result.firstHrefs = hrefs.slice(0, 3);

  // Click the GP card's calculate button -> should pre-select GP Sheets
  // Find the article containing "Galvanized Plain" then its calculate link
  const gpLink = page
    .locator("article", { hasText: "Galvanized Plain" })
    .getByRole("link", { name: /Calculate Weight & Price/i });
  await gpLink.scrollIntoViewIfNeeded();
  await gpLink.click();
  await page.waitForURL(/\/calculator/);
  await sleep(2500);
  result.calcUrl = page.url();
  const selected = await page.locator("select").first().inputValue();
  result.preselectedProduct = selected;
} catch (err) {
  result.error = err.message;
} finally {
  log("RESULT:", JSON.stringify(result, null, 2));
  await browser.close();
}
