/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
   * @param {string} url
   * @returns {Boolean}
   */
export function validURL (url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
   * @param {string} email
   * @returns {Boolean}
   */
export function validEmail (email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function isString (str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
   * @param {Array} arg
   * @returns {Boolean}
   */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
// 是否是邮箱
export function isEmail (str) {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return reg.test(str)
}
// 是否是手机
export function isPhone (str) {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(str)
}
// 是否是数字
export function isNum (str) {
  const reg = /^\d+$/
  return reg.test(str)
}
// 是否是中文
export function isChinese (str) {
  const reg = /[\u4e00-\u9fa5]/
  return reg.test(str)
}
// 是否是IP
export function isIP (str) {
  const reg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
  return reg.test(str)
}

//去除空格
export function replaceSpace (str) {
console.log(str)
  return str.split(/[\t\r\f\n\s]*/g).join('')
}
