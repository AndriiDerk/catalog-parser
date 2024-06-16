const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");

class parserService {
  async parseCatalog(link) {
    try {
      puppeteer.use(StealthPlugin());

      const browser = await puppeteer.launch({
        slowMo: 100,
        devtools: true,
        executablePath: executablePath(),
        args: [
          "--window-size=1920,1080",
          "--no-sandbox",
          "--disable-setuid-sandbox",
        ],
        // headless: false,
        headless: "new",
      });

      const page = await browser.newPage();

      await page.goto(link, {
        waitUntil: ["networkidle0", "domcontentloaded"],
      });

      await page.click('[id="cookie-close"]');

      await page.waitForSelector('[class="card card-catalogue"]');
      const data = await page.evaluate(() => {
        try {
          const container = document.querySelectorAll(
            '[class="card card-catalogue"]'
          );
          let name = "",
            link = "#",
            date = "",
            data = [];

          for (let key of container) {
            try {
              name = key.querySelector("h3").innerText;
              link = key.querySelector('[class="link-icon solid pdf"]').href;
              date = key.querySelector("p").innerText;

              data.push({ name, link, date });
            } catch (e) {
              console.log(
                'parserCatalog - [class="card card-catalogue"] - get data error: ',
                e
              );
            }
          }

          return data;
        } catch (e) {
          console.log(
            'parserCatalog - [class="card card-catalogue"] error: ',
            e
          );
        }
      });

      await browser.close();
      return data;
    } catch (e) {
      console.log("parseCatalog error: ", e);
    }
  }
}

module.exports = new parserService();
