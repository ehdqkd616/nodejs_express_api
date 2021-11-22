// 기존 nodejs 모듈 불러오기
const nodeUtil = require("util");

let util = {};

const path = require('path');
const appRoot = require('app-root-path');
const fileStream = require("fs");

// 커스터마이징된 forEach문
util.forEach = function (array, caller) {
    const length = array.length;

    for (let i = 0; i < length; i++) {
        if (caller(array[i], i) === true)
            return true;
    }

    return false;
}

// 다운로드할 경로, 파일명 지정
util.createSavePath = function (savePath, saveFileName, index, extension) {
    let dest = path.join(savePath, saveFileName + index + extension);
    return dest;
}

// 다운로드 할 실제 Url 생성
util.createUrl = function (url, index, extension) {
    let realUrl = url + index + extension;
    return realUrl;
}

// 파일 존재여부 체크하는 함수
util.isFileExistsAndValid = async function (location) {
    try {
        var stats = await fileStream.promises.stat(location);

        return stats && stats.isFile();
    } catch (exception) {
        return false;
    }
}

// 디렉토리 존재여부 체크하는 함수
util.isDirectoryExistsAndValid = async function (location) {
    try {
        var stats = await fileStream.promises.stat(location);

        return stats && stats.isDirectory();
    } catch (exception) {
        return false;
    }
}

// 디렉토리 생성하는 함수
util.createDirectory = async function (location, errorHandle = false, recursive = false) {
    try {
        await fileStream.promises.mkdir(location, {
            recursive: recursive
        });

        return errorHandle ? {
            success: true
        } : true;
    } catch (exception) {
        return errorHandle ? {
            success: false,
            exception: exception
        } : false;
    }
}

// 디렉토리에 있는 파일 리스트 불러오는 함수
util.getAllFileInDirectory = async function (location) {
    try {
        var result = [];
        const list = await fileStream.promises.readdir(location);
        const length = list.length;

        for (let i = 0; i < length; i++) {
            let v = list[i];

            if (await this.isFileExistsAndValid(path.join(location, v)))
                result.push(v);
        }

        return {
            success: true,
            data: result
        };
    } catch (exception) {
        return {
            success: false,
            exception: exception
        };
    }
}

// 파일을 작성하고 저장하는 함수
util.writeFile = async function (location, data, errorHandle = false, options = null) {
    try {
        await fileStream.promises.writeFile(location, data, options);

        return errorHandle ? {
            success: true
        } : true;
    } catch (exception) {
        return errorHandle ? {
            success: false,
            exception: exception
        } : false;
    }
}

// 파일을 읽고 data와 success 여부를 반환하는 함수
util.readFile = async function (location, errorHandle = false, options = null) {
    try {
        var data = await fileStream.promises.readFile(location, options);

        return errorHandle ? {
            success: true,
            data: data
        } : data;
    } catch (exception) {
        return errorHandle ? {
            success: false,
            exception: exception
        } : null;
    }
}

// 파일을 복사하는 함수
util.copyFile = async function (source, dest, errorHandle = false, flags = null) {
    try {
        await fileStream.promises.copyFile(source, dest, flags);

        return errorHandle ? {
            success: true
        } : true;
    } catch (exception) {
        return errorHandle ? {
            success: false,
            exception: exception
        } : false;
    }
}

// 파일을 삭제하는 함수
util.deleteFile = async function (location, errorHandle = false) {
    try {
        await fileStream.promises.unlink(location);

        return errorHandle ? {
            success: true
        } : true;
    } catch (exception) {
        return errorHandle ? {
            success: false,
            exception: exception
        } : false;
    }
}


// 디렉토리에 있는 파일 리스트 불러오는 함수
util.getAllFileAndFolderInDirectory = async function (location) {
    try {
        let _menuList = [];
        let _dirList = [];

        await fileStream.readdirSync(location, {
            withFileTypes: true
        }).forEach(dir => {
            _dirList.push(dir.name)

            fileStream.readdirSync(path.join(location, dir.name), {
                withFileTypes: true
            }).forEach(file => {
                _menuList.push(file.name)
            });
        });

        console.log(`dirList : ${_dirList}`);
        console.log(`menuList : ${_menuList}`);

        return
        const length = list.length;

        for (let i = 0; i < length; i++) {
            let v = list[i];

            if (await this.isFileExistsAndValid(path.join(location, v)))
                result.push(v);
        }

        return {
            success: true,
            data: result
        };
    } catch (exception) {
        return {
            success: false,
            exception: exception
        };
    }
}

// 디렉토리에 있는 폴더 리스트 불러오는 함수
util.getAllDirectory = async function (location) {
    try {
        let result = [];
        let list = [];

        await fileStream.readdirSync(location, {
            withFileTypes: true
        }).forEach(dir => {
            if (dir.isDirectory()) {
                list.push(dir.name)
            }
        });

        const length = list.length;

        for (let i = 0; i < length; i++) {
            let v = list[i];

            if (await this.isDirectoryExistsAndValid(path.join(location, v))) {
                result.push(v);
            }
        }
        return {
            success: true,
            data: result
        };
    } catch (exception) {
        return {
            success: false,
            exception: exception
        };
    }
}

// 폴더구조 객체화
// util.dirTree = function (filename) {
//     var stats = fileStream.lstatSync(filename),
//         info = {
//             path: filename,
//             name: path.basename(filename)
//         };

//     if (stats.isDirectory()) {
//         info.type = "folder";
//         info.children = fileStream.readdirSync(filename).map(function (child) {
//             return util.dirTree(filename + '/' + child);
//         });
//     } else {
//         // Assuming it's a file. In real life it could be a symlink or
//         // something else!
//         info.type = "file";
//     }
//     return info;
// }

// 기존 nodejs 자체 util 모듈 상속
util = Object.assign(util, nodeUtil);

module.exports = util;