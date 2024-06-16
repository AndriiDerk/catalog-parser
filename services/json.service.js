const fs = require("fs");
const path = require("path");

class jsonService {
  async outputData(data) {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const outputPath = path.join(__dirname, "../src/data.json");

      fs.writeFile(outputPath, jsonString, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully");
        }
      });
    } catch (e) {
      console.log("outputData error: ", e);
    }
  }
}

module.exports = new jsonService();
