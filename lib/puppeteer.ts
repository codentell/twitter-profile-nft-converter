const chromium = require("chrome-aws-lambda");

let page:any;

async function getPage() {
  if (page) {
    return page;
  }

  const options =
    process.env.IS_PROD === "1"
      ? {
          args: chromium.args,
          executablePath: await chromium.executablePath,
          headless: true,
        }
      : {
          args: [],
          executablePath:
            process.platform === "win32"
              ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
              : process.platform === "linux"
              ? "/usr/bin/google-chrome"
              : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          headless: true,
        };

  const browser = await chromium.puppeteer.launch(options);

  page = await browser.newPage();

  return page;
}
export async function getScreenshot(html:any, type:any) {
    const page = await getPage();
  
    await page.setViewport({ width: 1024, height: 585 });
    await page.setContent(html);
  
    return await page.screenshot({ type });
  }