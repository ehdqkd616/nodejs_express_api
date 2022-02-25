// const xlsx = require('xlsx');
const xlsx = require('node-xlsx');

// const workbook = xlsx.readFile("Emfo_Book_UpLoad_sample.xlsx");
var obj = xlsx.parse('Emfo_Book_UpLoad_sample.xls'); // parses a file

const resData = {}
const fs = require("fs");



// resData["Sheet1"] = xlsx.utils.sheet_to_csv(workbook.Sheets["Sheet1"], {
//     FS: "!@#$"
// });

// console.log(resData["Sheet1"]);

// var output_file_name = "out.csv";
// var stream = xlsx.stream.to_csv(resData["Sheet1"]);

// console.log(xlsx.utils.make_csv(output_file_name));

// stream.pipe(fs.createWriteStream(output_file_name));

obj[0].data.shift()

console.log(obj[0].data);