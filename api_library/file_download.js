const http = require('http');
const https = require('https');
const fs = require('fs');

const FileDownload = {};

FileDownload.download_exec = async (url, dest) => {
    try {
        let result = await FileDownload.download(url, dest);
        console.log(result);
    } catch (err) {
        console.log("파일 다운로드 실패 : " + err);
    }
}

FileDownload.download = function (url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest, {
            flags: "wx"
        });

        let client = http; /* default client */

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        const request = client.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
            } else {
                file.close();
                fs.unlink(dest, () => {}); // Delete temp file
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        });

        file.on('finish', function () {
            resolve("파일 다운로드 성공");
        });

        file.on("error", err => {
            file.close();

            if (err.code === "EEXIST") {
                reject("File already exists");
            } else {
                fs.unlink(dest, () => {}); // Delete temp file
                reject(err.message);
            }
        });
    });
}

module.exports = FileDownload;