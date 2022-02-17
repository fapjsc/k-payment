import CryptoJS from 'crypto-js';

// 千分位加上小數點
export const thousandsFormat = (data, tofixed = 2) => {
  if (!Number.isNaN(data) && data !== undefined) {
    if (data > 999 || data < -999) {
      let dataStr = data.toString();
      let integer;
      let decimals;
      let newdata = '';
      const flg = ',';
      if (dataStr.indexOf('.') !== -1) {
        dataStr = Number(dataStr).toFixed(tofixed);
        integer = dataStr.split('.')[0];
        decimals = dataStr.split('.')[1];
        for (let i = integer.length; i > 0; i -= 3) {
          const tmp = integer.substring(i - 3, i);
          if (i - 3 <= 0) {
            newdata = tmp + newdata;
          } else newdata = flg + tmp + newdata;
        }
        newdata = `${newdata}.${decimals}`;
      } else {
        integer = dataStr;
        for (let i = integer.length; i > 0; i -= 3) {
          const tmp = integer.substring(i - 3, i);
          if (i - 3 <= 0) {
            newdata = `${tmp + newdata}.00`;
          } else newdata = flg + tmp + newdata;
        }
      }
      return newdata; // 傳入的數字
    }
    return data?.toFixed(2);
  }
  return data?.toFixed(2);
};
// export const thousandsFormat =
//(text) => (text * 1).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

const key = CryptoJS.enc.Utf8.parse('N2841A3412APCD6F'); // 16位進制key
const iv = CryptoJS.enc.Utf8.parse('AUCDTF12H41P34Y2'); //  16位進制key的偏移量

// /** 解密*/
export const _decrypt = (word) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

// /** 加密*/
export const _encrypt = (word) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

export const _iosWhite = () => {
  const u = navigator.userAgent;

  let flag;
  let myFunction;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  if (isIOS) {
    window.addEventListener('focusin', () => {
      flag = true;
      clearTimeout(myFunction);
    });
    window.addEventListener('focusout', () => {
      flag = false;
      if (!flag) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    });
  }
};

// export const _isIOS15 = () => !!navigator.userAgent.indexOf('iPhone OS 15') !== -1;
export const _isIOS15 = () => navigator.userAgent.indexOf('iPhone OS 15') !== -1;
