var request = require('request'),
    JSONStream = require('JSONStream'),
    es = require('event-stream')


const parser = JSONStream.stringifyObject();
parser.pipe()

var json_opject = [{
        "RName": "서자룡",
        "Num": "010-7777-888",
        "E1": "팀장",
        "E2": 2000
    },
    {
        "RName": "윤상중",
        "Num": "010-784-4844",
        "E1": "대리",
        "E2": 2001
    },
    {
        "RName": "김태영",
        "Num": "010-484-7888",
        "E1": "대리",
        "E2": 3012
    },
    {
        "RName": "이영무",
        "Num": "010-2548-1470",
        "E1": "주임",
        "E2": 3022
    }
];

json_opject
    .pipe(JSONStream.parse('rows.*'))
    .pipe(es.mapSync(function (data) {
        console.error(data)
        return data
    }))

var stream = JSONStream.parse(json_opject);

stream.on('data', function (data) {
    console.log('received:', data);
});

//emits anything from _before_ the first match
stream.on('header', function (data) {
    console.log('header:', data) // => {"total_rows":129,"offset":0}
});