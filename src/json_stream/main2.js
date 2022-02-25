var JSONStream = require('JSONStream');
var es = require('event-stream');
var fs = require('fs');
// var chalk = require("chalk");

var records = [{
        id: 1,
        name: "Terminator"
    },
    {
        id: 2,
        name: "Predator"
    },
    {
        id: 3,
        name: "True Lies"
    },
    {
        id: 4,
        name: "Running Man"
    },
    {
        id: 5,
        name: "Twins"
    }
];

var transformStream = JSONStream.stringify();
var outputStream = fs.createWriteStream(__dirname + "/data.json");

// In this case, we're going to pipe the serialized objects to a data file.
transformStream.pipe(outputStream);

// Iterate over the records and write EACH ONE to the TRANSFORM stream individually.
// --
// NOTE: If we had tried to write the entire record-set in one operation, the output
// would be malformed - it expects to be given items, not collections.
records.forEach(transformStream.write);

// Once we've written each record in the record-set, we have to end the stream so that
// the TRANSFORM stream knows to output the end of the array it is generating.
transformStream.end();

// Once the JSONStream has flushed all data to the output stream, let's indicate done.
outputStream.on(
    "finish",
    function handleFinish() {

        // console.log(chalk.green("JSONStream serialization complete!"));
        console.log("- - - - - - - - - - - - - - - - - - - - - - -");

    }
);


// var out = fs.createWriteStream(__dirname + '/out.json');

// es.readable(function (count, next) {
//     for (var key in obj) {
//         this.emit('data', [key, obj[key]]);
//     }
//     this.emit('end');
//     next();
// }).pipe(JSONStream.stringifyObject()).pipe(out);