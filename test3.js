// let numbersArr = [1, 2, 3, 4, 5, 6, 7, 8];
// let numberLen = numbersArr.length;

// for (let i = 0; i < numberLen; i += 3) {
//     console.log(numbersArr.slice(i, i + 3));
// }



let resultArr = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'SUCCESS', 'SUCCESS', 'SUCCESS'];

console.log(resultArr.every((result) => result === resultArr[0]));