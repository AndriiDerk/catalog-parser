const axios = require("axios");
const fs = require("fs");
const path = require("path");

class jsonService {
  async downloadPDF(url) {
    try {
      const name = new Date().getTime();

      const outputPath = path.join(__dirname, `../src/${name}.pdf`);
      const response = await axios({
        method: "GET",
        url: url,
        responseType: "stream",
      });

      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      return outputPath;
    } catch (e) {
      console.log("downloadPDF error: ", e);
    }
  }

  async download(data) {
    try {
      await this.deleteAllFiles(path.join(__dirname, `../src/`));

      for (let key of data) {
        try {
          let localLink = await this.downloadPDF(key.link);
          key.localLink = localLink;
        } catch (e) {
          console.log("outputData - download pdf error: ", e);
        }
      }

      return data;
    } catch (e) {
      console.log("outputData error: ", e);
    }
  }

  async deleteAllFiles(directory) {
    try {
      const files = fs.readdirSync(directory);
      files.forEach((file) => {
        const filePath = path.join(directory, file);
        fs.unlinkSync(filePath);
        console.log(`${file} deleted`);
      });
    } catch (err) {
      console.error("Error deleting files:", err);
    }
  }
}

module.exports = new jsonService();
