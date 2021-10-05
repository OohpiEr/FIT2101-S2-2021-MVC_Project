import CryptoJS from 'crypto-js'

export function encrypt(string, key){
    return CryptoJS.AES.encrypt(string, key);
}

//const encrypt = string => key => CryptoJS.AES.encrypt(string, key);

export function decrypt(string, key){
    return CryptoJS.AES.decrypt(string, key).toString(CryptoJS.enc.Utf8);
}

//const decrupt = string => key => CryptoJS.AES.decrypt(string, key).toString(CryptoJS.enc.Utf8);