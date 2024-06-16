const parserService = require("./services/parser.service");
const pdfService = require("./services/pdf.service");
const jsonService = require("./services/json.service");

async function start() {
  try {
    console.log("start parse!");

    const link = "https://www.tus.si/";
    let data = await parserService.parseCatalog(link);
    data = await pdfService.download(data);
    await jsonService.outputData(data);

    console.log("data parsed!");
  } catch (e) {
    console.log("start error: ", e);
  }
}

start();
