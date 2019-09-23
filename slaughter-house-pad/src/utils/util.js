/**
 * 工具类
 */
import CryptoJS from 'crypto-js'
// 默认的 KEY 与 iv 如果没有给
const KEY = 'E85AD5BB0D06E0F8660B6E9F77E7F6B8182E269D4687CD1A1643F6DD9A8418DC' // ""中与后台一样  密码
export default { // 加密
/**
 * AES加密 ：字符串 key iv  返回base64
 */
  Encrypt (word) {
    let key = CryptoJS.enc.Hex.parse(KEY)
    let encrypted = CryptoJS.AES.encrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    var hexStr = encrypted.ciphertext.toString().toUpperCase()
    return hexStr
  }
}
