const xlsx = require("xlsx");
const book = xlsx.utils.book_new();

let phone_book_arr = [];

function random_hangul(n) {
    let str = '';

    for (var j = 0; j < n; j++) {
        str += String.fromCharCode(44031 + Math.ceil(11172 * Math.random()));
    }

    return str;
}

function generateRandomPhone() {
    let str = '010';

    str += '-';

    for (let i = 0; i < 4; i++) {
        str += Math.floor(Math.random() * 10)
    }

    str += '-';

    for (let i = 0; i < 4; i++) {
        str += Math.floor(Math.random() * 10)
    }

    return str
}

// phone_book_arr.push(["이름", "전화번호", "메모1", "메모2", "메모3", "메모4", "메모5"]);
phone_book_arr.push(["이름", "그룹", "전화번호", "메모1", "메모2", "메모3", "메모4", "메모5"]);

// for (let i = 0; i < 300000; i++) {
//     let arr = [];

//     arr.push(random_hangul(3));
//     arr.push(generateRandomPhone());
//     arr.push(random_hangul(3));
//     arr.push(random_hangul(3));
//     arr.push(random_hangul(3));
//     arr.push(random_hangul(3));
//     arr.push(random_hangul(3));

//     phone_book_arr.push(arr);

// }

for (let i = 0; i < 300000; i++) {
    let arr = [];

    arr.push(random_hangul(3));
    arr.push(random_hangul(4));
    arr.push(generateRandomPhone());
    arr.push(random_hangul(3));
    arr.push(random_hangul(3));
    arr.push(random_hangul(3));
    arr.push(random_hangul(3));
    arr.push(random_hangul(3));

    phone_book_arr.push(arr);

}

const phone_book = xlsx.utils.aoa_to_sheet(phone_book_arr);

xlsx.utils.book_append_sheet(book, phone_book, "ADDRESS");

// xlsx.writeFile(book, "Emfo_Book_UpLoad_sample 30만명 테스트(그룹 x).xlsx");

xlsx.writeFile(book, "Emfo_Book_UpLoad_sample 30만명 테스트(그룹 추가).xlsx");