function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
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

function random_hangul() {
    let str = '';

    for (var j = 0; j < 3; j++) {
        str += String.fromCharCode(44031 + Math.ceil(11172 * Math.random()));
    }

    return str;
}

function random_english_small(n) {
    let str = '';

    for (var j = 0; j < n; j++) {
        str += String.fromCharCode(96 + Math.ceil(26 * Math.random()));
    }

    return str;
}