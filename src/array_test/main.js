/* 문제 1
 * 1부터 6까지의 정수를 담은 numbers라는 배열이 주어집니다.
 * numbers 배열에서 3보다 큰 숫자로만 이루어진
 * 새로운 배열을 만들어주는 함수를 작성해주세요.
 */

function solution(numbers) {
    const arr = [];
    custom_foreach(numbers, function (data, i) {
        if (data >= 3)
            arr.push(data);
    });
    return arr;
}

const numbers = [1, 2, 3, 4, 5, 6];
console.log(solution(numbers));

// 커스터마이징된 forEach문
function custom_foreach(array, caller) {

    const length = array.length;

    for (let i = 0; i < length; i++) {
        if (caller(array[i], i) === true)
            return true;
    }

    return false;
}

// export default solution;

// 코드 화면과 우측 Tests 결과 화면을 같이 캡쳐해서 보내주세요!