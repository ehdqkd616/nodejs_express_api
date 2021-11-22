require('../../api_library/globalvar');
let util = require('../../api_library/util');

const path = require("path");
const appRoot = require('app-root-path');

const FileDownload = require('../../api_library/file_download');

let savePath = path.join(appRoot.path, 'downloadFiles');
let saveFileName = "ico_animation_wt";
let extension = ".svg";

let index = 1;

// let url = "https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt1.svg";
let url = "https://ssl.pstatic.net/static/weather/image/icon_weather/ico_animation_wt";

let realUrl = util.createUrl(url, index, extension);
let dest = util.createSavePath(savePath, saveFileName, index, extension);

FileDownload.download_exec(realUrl, dest);

// for (index = 1; index < 100; index++) {
//     realUrl = util.createUrl(url, index, extension);
//     dest = util.createSavePath(savePath, saveFileName, index, extension);
//     FileDownload.download_exec(realUrl, dest);
// }