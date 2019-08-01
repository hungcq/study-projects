import CryptoJS from 'crypto-js';
import md5 from 'md5';

export function hashPassword (username, password) {
  const keymd5 = md5(username + '.' + password);
  const key = CryptoJS.enc.Utf8.parse(keymd5);
  return CryptoJS.DES.encrypt(password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

export function encryptByDES (text, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  return CryptoJS.DES.encrypt(text, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

export function decryptByDES (ciphertext, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  // direct decrypt ciphertext
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}