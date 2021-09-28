const path = require('path');
const appRoot = require('app-root-path');

require("./api_library/globalvar"); // 전역 변수 로드
let util = require("./api_library/util"); // util 로드

let url = "https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt2.svg";
let savePath = path.join(appRoot.path, 'downloadFiles');
let saveFileName = "ico_animation_wt";
let extension = ".svg";

console.log(util.createSavePath(savePath, saveFileName, 1, extension));