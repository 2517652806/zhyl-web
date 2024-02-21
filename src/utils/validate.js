/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  /* const valid_map = ['admin', 'editor','lax ']
  return valid_map.indexOf(str.trim()) >= 0 */
  const regex = /^[\u4e00-\u9fa5\w\d]{2,}$/;
  return regex.test(str.trim());
}
export function validadminname(str) {
  const valid_map = ['zyy']
  return valid_map.indexOf(str.trim()) >= 0
}
