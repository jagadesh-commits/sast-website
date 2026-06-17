import { chromium } from "playwright";

const URL = "http://localhost:3000";
const HEADING = "Get a FREE Quote Before You Leave!";

function log(...args) {
  console.log("[popup-test]", ...args);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});

let result = { step1_appeared: false, step2_no_reappear: null, cursorPointer: null };

try {
  // --- Phase 1: clear gate, arm, trigger exit intent ---
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => sessionStorage.removeItem("sas-exit-popup-shown"));
  const cleared = await page.evaluate(() => sessionStorage.getItem("sas-exit-popup-shown"));
  log("after removeItem, sessionStorage key =", cleared);

  await page.reload({ waitUntil: "domcontentloaded" });
  log("reloaded; waiting 6s for the 5s arming timer...");
  await sleep(6000);

  // Simulate exit intent: mouse to the very top edge + dispatch a mousemove at clientY=0
  await page.mouse.move(640, 400);
  await page.mouse.move(640, 0);
  await page.evaluate(() => {
    document.dispatchEvent(new MouseEvent("mousemove", { clientY: 0, clientX: 640, bubbles: true }));
  });

  const heading = page.getByText(HEADING, { exact: false });
  try {
    await heading.waitFor({ state: "visible", timeout: 4000 });
    result.step1_appeared = true;
  } catch {
    result.step1_appeared = false;
  }
  log("Phase 1 - popup appeared:", result.step1_appeared);

  await page.screenshot({ path: "_popup_test_phase1.png" });

  if (result.step1_appeared) {
    const sessionVal = await page.evaluate(() => sessionStorage.getItem("sas-exit-popup-shown"));
    log("sessionStorage key after trigger (expect '1'):", sessionVal);

    // Check computed cursor on the two controls
    const cursors = await page.evaluate(() => {
      const out = {};
      const quoteBtn = [...document.querySelectorAll("button")].find((b) =>
        /Get My Free Quote/i.test(b.textContent || ""),
      );
      const noThanks = [...document.querySelectorAll("button")].find((b) =>
        /No thanks/i.test(b.textContent || ""),
      );
      out.quote = quoteBtn ? getComputedStyle(quoteBtn).cursor : "not-found";
      out.noThanks = noThanks ? getComputedStyle(noThanks).cursor : "not-found";
      return out;
    });
    result.cursorPointer = cursors;
    log("computed cursor styles:", JSON.stringify(cursors));

    // Click "No thanks" to verify it closes
    await page.getByRole("button", { name: /No thanks/i }).click();
    await sleep(800);
    const stillVisible = await heading.isVisible().catch(() => false);
    log("after clicking 'No thanks', popup still visible (expect false):", stillVisible);
    result.closesOnNoThanks = !stillVisible;
  }

  // --- Phase 2: reload WITHOUT clearing; popup must NOT reappear ---
  await page.reload({ waitUntil: "domcontentloaded" });
  log("Phase 2 - reloaded without clearing; waiting 6s...");
  await sleep(6000);
  await page.mouse.move(640, 400);
  await page.mouse.move(640, 0);
  await page.evaluate(() => {
    document.dispatchEvent(new MouseEvent("mousemove", { clientY: 0, clientX: 640, bubbles: true }));
  });
  let reappeared = false;
  try {
    await page.getByText(HEADING, { exact: false }).waitFor({ state: "visible", timeout: 3000 });
    reappeared = true;
  } catch {
    reappeared = false;
  }
  result.step2_no_reappear = !reappeared;
  log("Phase 2 - popup reappeared (expect false):", reappeared);
  await page.screenshot({ path: "_popup_test_phase2.png" });
} catch (err) {
  log("ERROR during test:", err.message);
} finally {
  log("console errors captured:", consoleErrors.length ? consoleErrors : "none");
  log("RESULT:", JSON.stringify(result, null, 2));
  await browser.close();
}
