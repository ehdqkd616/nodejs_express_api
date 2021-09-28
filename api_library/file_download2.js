const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

let util = require("./util"); // util 로드

let client = http; /* default client */

// let url = "https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt1.svg";
let url = "https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt";
let savePath = path.join(appRoot.path, 'downloadFiles');
let saveFileName = "ico_animation_wt";
let extension = ".svg";

let index = 1;

let realUrl = util.createUrl(url, index, extension);
let dest = util.createSavePath(savePath, saveFileName, index, extension);

if (url.toString().indexOf("https") === 0) {
    client = https;
}

// client = (url.protocol == "https") ? https : client;

function download(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = client.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb); // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};


for (index = 1; index < 100; index++) {
    realUrl = util.createUrl(url, index, extension);
    dest = util.createSavePath(savePath, saveFileName, index, extension);
    download(realUrl, dest);
}