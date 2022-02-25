var JSONStream = require('JSONStream');
var es = require('event-stream');
var fs = require('fs');

var obj = {};
for (var i = 0; i < 2000; i++) {
    obj['prop' + i] = 'value' + i;
}

var out = fs.createWriteStream(__dirname + '/out.json');

es.readable(function (count, next) {
    for (var key in obj) {
        this.emit('data', [key, obj[key]]);
    }
    this.emit('end');
    next();
}).pipe(JSONStream.stringifyObject()).pipe(out);