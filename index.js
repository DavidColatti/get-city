const fs = require("fs");
const csv = require("csv-array");
const zipcodes = require("zipcodes");
const { convertArrayToCSV } = require("convert-array-to-csv");

const dataArray = require("./data.json");

const outputCsv = async (list) => {
  const results = list.map((each) => {
    const data = zipcodes.lookup(each.zip_code);
    return {
      ...each,
      ...data,
    };
  });

  const csv = await convertArrayToCSV(results);

  fs.writeFile("./output.csv", csv, (err) => {
    console.log(err || "Done");
  });
};

if (dataArray.length > 0) {
  outputCsv(dataArray);
} else {
  csv.parseCSV("data.csv", async function (list) {
    outputCsv(list);
  });
}
