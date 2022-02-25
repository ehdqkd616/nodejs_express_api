var ExcelCSV = require('excelcsv');

var header = ['이름', '전화번호', '메모1', '메모2', '메모3', '메모4', '메모5'],
    fileIn = 'Emfo_Book_UpLoad_sample.xlsx',
    fileOut = 'example.csv';

// fileOut is optional.
var parser = new ExcelCSV(fileIn, fileOut);
var csv = parser
    // optional.
    .header(header)
    // optional.
    .row(function (worksheet, row) {
        console.log(worksheet);
        // Transform data here or return false to skip the row.
        // return row;
    })
    .init();