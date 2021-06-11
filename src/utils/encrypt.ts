import JSEncrypt from 'jsencrypt';
import CryptoES from 'crypto-es';

export function rsaEncrypt(data: string, key: string) {
  let encrypt = new JSEncrypt({});
  encrypt.setPublicKey(key);
  return encrypt.encrypt(data);
}

export function desEncrypt(data: string, key: string) {
  const {enc,DES,mode,pad} = CryptoES;
  let keyHex = enc.Utf8.parse(key);
  return DES.encrypt(enc.Utf8.parse(data), keyHex, {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  }).toString();
}

export function desDecrypt(ciphertext: string, key: string) {
  const {enc,DES,mode,pad} = CryptoES;
  let keyHex = enc.Utf8.parse(key);
  return DES.decrypt(ciphertext, keyHex, {         //enc.Base64.parse(ciphertext)
    mode: mode.ECB,
    padding: pad.Pkcs7,
  }).toString(enc.Utf8);
}


export function md5Encrypt(data: string) {
  const {MD5} = CryptoES;
  return MD5(data).toString();
}

export function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}

export const getGuid = () => {
  let guid = (+new Date()).toString(32), i = 0;
  for (; i < 3; i++) {
    guid += Math.floor(Math.random() * 65535).toString(32);
  }
  return guid;
};

export function uuidByDigit(num: number) {
  if (num && num > 0) {
    let res = '';
    while (--num) {
      res += ((1 + Math.random()) * 0x10 | 0).toString(16).substring(1);
    }
    return res;
  } else {
    return uuid();
  }
}
