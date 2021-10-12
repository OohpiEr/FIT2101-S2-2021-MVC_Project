const CryptoJS = require('crypto-js');
const SECRET_KEY = 'long_secret_key_that_should_be_used_for_authentication';
const salt = "SECRET SALT";
const iv = "SECRET IV";
const key = CryptoJS.PBKDF2(SECRET_KEY,CryptoJS.enc.Utf8.parse(salt), {keySize: 512/32, iterations: 1000});

exports.encrypt = function encrypt(string){
    return CryptoJS.AES.encrypt(string, key, { iv: CryptoJS.enc.Utf8.parse(iv) }).toString();
}

//const encrypt = string => key => CryptoJS.AES.encrypt(string, key);

exports.decrypt = function decrypt(string){
    return CryptoJS.AES.decrypt(string, key, { iv: CryptoJS.enc.Utf8.parse(iv)}).toString(CryptoJS.enc.Utf8);
}

//const decrupt = string => key => CryptoJS.AES.decrypt(string, key).toString(CryptoJS.enc.Utf8);