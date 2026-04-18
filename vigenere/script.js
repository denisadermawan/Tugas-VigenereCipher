function generateKey(text, key) {
    let generatedKey = "";
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        if (isLetter(text[i])) {
            generatedKey += key[keyIndex % key.length];
            keyIndex++;
        } else {
            generatedKey += text[i];
        }
    }
            return generatedKey;
}

function isLetter(c) {
    return (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z');
}

function charToNum(c) {
    if (c >= 'A' && c <= 'Z') return c.charCodeAt(0) - 'A'.charCodeAt(0);
    if (c >= 'a' && c <= 'z') return c.charCodeAt(0) - 'a'.charCodeAt(0);
    return -1;
}

function numToChar(num, originalChar) {
    let isUpper = (originalChar >= 'A' && originalChar <= 'Z');
    let base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
    return String.fromCharCode(base + num);
}

function cipherText(plainText, key) {
    let cipher = "";
    for (let i = 0; i < plainText.length; i++) {
        let pChar = plainText[i];
        let kChar = key[i];

        if (isLetter(pChar) && isLetter(kChar)) {
            let pNum = charToNum(pChar);
            let kNum = charToNum(kChar);
            let encryptedNum = (pNum + kNum) % 26;
            cipher += numToChar(encryptedNum, pChar);
        } else {
            cipher += pChar; 
        }
    }
    return cipher;
}

function originalText(cipherText, keyA) {
    let plain = "";
    for (let i = 0; i < cipherText.length; i++) {
        let cChar = cipherText[i];
        let kChar = keyA[i];

        if (isLetter(cChar) && isLetter(kChar)) {
            let cNum = charToNum(cChar);
            let kNum = charToNum(kChar);
            let decryptedNum = (cNum - kNum + 26) % 26;
            plain += numToChar(decryptedNum, cChar);
        } else {
            plain += cChar;
        }
    }
    return plain;
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
        return c;
    });
}