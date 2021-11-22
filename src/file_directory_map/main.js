const FileMap = require('../../api_library/file_map');

const Server = {}

Server.initialize = async function () {
    await FileMap.initialize();

    console.log(FileMap._list);

    // setTimeout(function () {
    //     console.log("왜 안됨");
    //     for (var i = 0; i < FileMap._list.length; i++) {
    //         console.log(FileMap._list[i]);
    //     }
    // }, 1000);
}

Server.initialize();