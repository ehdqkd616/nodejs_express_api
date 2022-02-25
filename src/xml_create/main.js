const {
    create
} = require('xmlbuilder2');

const root = create()
    .ele('root')
    .ele('mem', {
        att: 'val'
    });

let xml = root.end({
    prettyPrint: false
});

xml = xml.replace('<?xml version="1.0"?>', '');

console.log(xml);