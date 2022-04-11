const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password({
    // iterations: 100
    // saltLength: 100,
    keyLength: 100
});
// const assert = require("assert");

// const password = "비밀번호486";
const opts = {
    password: "비밀번호486",
}

// 10bytes

// password인 비밀번호486을 암호화
// 회원가입 때는 이와 같이 password만을 파라미터로 넣는다.
hasher(opts, (error, pw, salt, hash) => {

    opts.salt = salt;
    // opts.salt = "salt 값";

    if (error) {
        console.log(error);
        return;
    }

    console.log("암호화 된 비밀번호 '비밀번호486'");
    console.log("==============================================");
    console.log(hash.length);
    console.log("==============================================");
    console.log("암호화에 사용한 salt");
    console.log("==============================================");
    console.log(opts.salt);
    console.log("==============================================");

    // password인 비밀번호485을 암호화
    // 로그인 때는 이와 같이 password와 저장되어 있는 salt를 같이 파라미터로 넣는다.
    // hasher(opts, (error2, pw2, salt2, hash2) => {
    hasher({
        password: "비밀번호485",
        salt: opts.salt
    }, (error2, pw2, salt2, hash2) => {
        if (error2) {
            console.log(error2);
            return;
        }

        console.log("암호화 된 비밀번호 '비밀번호485'");
        console.log("==============================================");
        console.log(hash2);
        console.log("==============================================");

        if (hash === hash2) {
            console.log("로그인 성공!");
        } else {
            console.log("로그인 실패!");
        }
    });
});