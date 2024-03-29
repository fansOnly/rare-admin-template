import { Code, _Sm2, _Sm3, _Sm4 } from './pnc-crypto-min'
const sm3Salt = 'GZBASE'

function M1(datas) {
  const length = datas.length
  let size = length % 16
  size = 16 - size
  const tmp = []
  tmp[0] = 29
  for (let i = 1; i < size; i++) {
    tmp[i] = (Math.round(Math.random() * 150) % 150) + 30
  }
  const l = size + length
  let out = []
  out = [].concat(datas)
  for (let i = 0; i < tmp.length; i++) {
    if (i < size) {
      out.push(tmp[i])
    }
  }
  return out
}

function M3(m1, m2) {
  const lenM1 = m1.length
  const lenM2 = m2.length
  const out = []
  const m3 = xor(m1, m2)
  for (let i = 0; i < m3.length; i++) {
    if (i < lenM1) {
      out.push(m3[i])
    }
  }
  for (let i = 0; i < m2.length; i++) {
    if (i < lenM2) {
      out.push(m2[i])
    }
  }
  return out
}

function xor(m1, m2) {
  const lenM1 = m1.length
  const m3 = []
  const s1 = lenM1 / 16
  for (let a = 0; a < s1; a++) {
    const index = a * 16
    for (let i = 0; i < 16; i++) {
      m3[index + i] = m1[index + i] ^ m2[i]
    }
  }
  return m3
}

function M2(datas) {
  const tmp = []
  for (let i = 0; i < 16; i++) {
    tmp[i] = Math.round(Math.random() * 255) % 255
  }
  return tmp
}

function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr
  }
  let str = ''
  const _arr = arr
  for (let i = 0; i < _arr.length; i++) {
    const one = _arr[i].toString(2)
    const v = one.match(/^1+?(?=0)/)
    if (v && one.length == 8) {
      const bytesLength = v[0].length
      let store = _arr[i].toString(2).slice(7 - bytesLength)
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2)
      }
      str += String.fromCharCode(parseInt(store, 2))
      i += bytesLength - 1
    } else {
      str += String.fromCharCode(_arr[i])
    }
  }
  return str
}

export default {
  /**
   * 三段式加密(国密)
   * SM3+SM4+SM2
   */
  encrypt(data, key) {
    if (typeof data != 'string') {
      data = JSON.stringify(data)
    }
    //			console.log('key\n' + key);
    const m1 = M1(Code.str2bytes(data))
    const m2 = M2()
    const m = M3(m1, m2)
    const r4 = _Sm4.encode(Code.bytes2hexStr(m), Code.str2bytes(key))
    const sm4Encode = Code.bytes2hexStr(r4)
    //			console.log('sm4\n' + sm4Encode);

    const sm2Encode = _Sm2.encode(key)
    //			console.log('sm2\n' + sm2Encode);

    const r3 = _Sm3.hash(Code.str2bytes(data + key + sm3Salt))
    const sm3Encode = Code.bytes2hexStr(r3)
    //			console.log('sm3\n' + sm3Encode);

    // SM3+SM4+SM2
    const result = '#10' + [sm3Encode, sm4Encode, sm2Encode].join(String.fromCharCode(29))
    //			console.log(result);
    return result
  },
  // SM4解密
  decrypt(data, key) {
    let encryptData = data.substr(14)
    const confuseStartPos = parseInt(data.substring(3, 5), 16)
    const confuseLen = parseInt(data.substring(5, 7), 16)
    const confuseRule = parseInt(data.substring(7, 8), 16)
    const originalLen = parseInt(data.substring(8, 14), 16)
    const confuseStr = encryptData.substring(confuseStartPos, confuseStartPos + confuseLen)
    const confuseStrLen = confuseStr.length
    const confuseData = []
    confuseData.push(encryptData.substring(0, confuseStartPos))
    switch (confuseRule) {
      case 1:
        confuseData.push(confuseStr.charAt(confuseStrLen - 1))
        confuseData.push(confuseStr.substring(1, confuseStrLen - 1))
        confuseData.push(confuseStr.charAt(0))
        break
      case 2:
        for (let j = 2; j <= confuseStrLen; ++j) {
          if (j % 2 == 0) {
            confuseData.push(confuseStr.charAt(j - 1))
            confuseData.push(confuseStr.charAt(j - 2))
          }
        }
        if (confuseStrLen % 2 != 0 && confuseStrLen > 0) {
          confuseData.push(confuseStr.charAt(confuseStrLen - 1))
          break
        }
        break
    }
    if (confuseRule != 0) {
      confuseData.push(encryptData.substring(confuseStartPos + confuseLen))
      encryptData = confuseData.join('')
    }
    encryptData = encryptData.substring(0, originalLen)
    //			console.log('encryptData\n' + encryptData);
    //			console.log('key\n' + key);
    const result = _Sm4.crypt(Code.hexStr2bytes(encryptData), Code.str2bytes(key), 0)
    return byteToString(result)
  },
  getEncryptKey() {
    return this.uuid(32, 16)
  },
  uuid(len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    let i
    radix = radix || chars.length
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
      // rfc4122, version 4 form
      let r
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      // Fill in random data. At i==19 set the high bits of
      // clock
      // sequence
      // as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16)
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  }
}
