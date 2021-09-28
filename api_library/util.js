// 기존 nodejs 모듈 불러오기
const nodeUtil = require("util");

let util = {};

const path = require('path');
const appRoot = require('app-root-path');

util.createSavePath = function (savePath, saveFileName, index, extension) {
    let dest = path.join(savePath, saveFileName + index + extension);
    return dest;
}

util.createUrl = function (url, index, extension) {
    let realUrl = url + index + extension;
    return realUrl;
}

// 기존 nodejs 자체 util 모듈 상속
util = Object.assign(util, nodeUtil);

module.exports = util;