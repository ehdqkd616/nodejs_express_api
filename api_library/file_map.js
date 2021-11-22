/*
 *   
 *   작성자: 김연우(kyw@emfoplus.co.kr)
 */

'use strict';

const FileMap = {
    _list: []
};

// 필수 모듈 로드
const util = require("./util");
const path = require("path");
const appRoot = require('app-root-path');

require('./globalvar');

FileMap.vars = {
    location: path.join(appRoot.path, "menu")
};

// // 사이트 메뉴 초기화 (Promise 형식)
// FileMap.initialize = async function () {
//     const self = this;
//     return new Promise(async (resolve, reject) => {
//         const folder_list = await util.getAllDirectory(path.join(appRoot.path, 'menu'));

//         if (!folder_list) {
//             console.log(`심각한 오류!: 메뉴를 가져올 수 없습니다! (err: ${ folder_list.exception.stack })`);
//             return;
//         }

//         let allFile_list = [];

//         console.log(`메뉴 폴더 목록 : ${folder_list.data}`);

//         for (let i = 0; i < folder_list.data.length; i++) {
//             let folder = folder_list.data[i];

//             let file_list = await util.getAllFileInDirectory(path.join(appRoot.path, 'menu', folder));

//             if (!file_list) {
//                 console.log(`심각한 오류!: 메뉴를 가져올 수 없습니다! (err: ${ file_list.exception.stack })`);
//                 return;
//             }

//             await util.forEach(file_list.data, function (file) {
//                 let dataTable = {
//                     uniqueID: path.basename(file, path.extname(file)), // 확장자 제거
//                     location: path.join(self.vars.location, folder, file), // 실제 파일 위치
//                     category: folder // 메뉴 카테고리 명
//                 };

//                 self._list.push(dataTable);
//                 console.log(`사이트 메뉴 [${ dataTable.uniqueID }]를 등록했습니다.`);
//             });

//             console.log(`사이트 카테고리 [${ folder }]를 등록했습니다.`);
//         }

//         resolve();
//     });
// }

// 사이트 메뉴 초기화 (async 형식)
FileMap.initialize = async function () {

    const self = this;

    // return new Promise(async (resolve, reject) => {
    const folder_list = await util.getAllDirectory(path.join(appRoot.path, 'menu'));

    if (!folder_list) {
        console.log(`심각한 오류!: 메뉴를 가져올 수 없습니다! (err: ${ folder_list.exception.stack })`);
        return;
    }

    let allFile_list = [];

    console.log(`메뉴 폴더 목록 : ${folder_list.data}`);

    for (let i = 0; i < folder_list.data.length; i++) {
        let folder = folder_list.data[i];

        let file_list = await util.getAllFileInDirectory(path.join(appRoot.path, 'menu', folder));

        if (!file_list) {
            console.log(`심각한 오류!: 메뉴를 가져올 수 없습니다! (err: ${ file_list.exception.stack })`);
            return;
        }

        util.forEach(file_list.data, function (file) {
            let dataTable = {
                uniqueID: path.basename(file, path.extname(file)), // 확장자 제거
                location: path.join(self.vars.location, folder, file), // 실제 파일 위치
                category: folder // 메뉴 카테고리 명
            };

            self._list.push(dataTable);
            console.log(`사이트 메뉴 [${ dataTable.uniqueID }]를 등록했습니다.`);
        });

        console.log(`사이트 카테고리 [${ folder }]를 등록했습니다.`);
        // Log.info(Log.category.normal, "SiteMenu", `사이트 메뉴 [${ dataTable.uniqueID }]를 등록했습니다.`);
    }
}

// 사이트 메뉴 재설정 함수
FileMap.renew = async function () {
    this._list = [];

    await this.initialize();
}

// 사이트 메뉴 success, HTML(String)을 담은 객체 데이터 반환
// success: false, reason: FAIL:IO, FAIL:AUTH, FAIL:NO_MENU
FileMap.getMenuContent = async function (isAuthenticated, uniqueID) {
    try {
        const menuData = this.getByUniqueID(uniqueID); // 메뉴 데이터 검증1

        // 메뉴 데이터 검증2
        if (!menuData) {
            return {
                success: false,
                reason: "FAIL:NO_MENU"
            };
        }

        // 파일 읽기
        const readFileResult = await util.readFile(menuData.location, true, {
            encoding: "utf8"
        });

        // 파일 읽기 오류에 대한 처리
        if (!readFileResult.success) {
            return {
                success: false,
                reason: "FAIL:IO"
            };
        }

        return {
            success: true,
            data: `${readFileResult.data}<script>$( ( ) => MenuSystem.onMenuLoad( ) );</script>` // String(HTML)
        };
    } catch (ex) {
        return {
            success: false,
            reason: "FAIL:SERVER"
        };
    }
}

// 사이트 메뉴 데이터 반환(메뉴 데이터 검증)
FileMap.getByUniqueID = function (uniqueID) {
    const length = this._list.length;

    for (let i = 0; i < length; i++) {
        let v = this._list[i];

        if (v.uniqueID === uniqueID)
            return v;
    }

    return null;
}

module.exports = FileMap;