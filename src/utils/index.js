/**
 * isEmptyObject
 * @param {*} object
 * @returns {Boolean} true or false
 */
export function isEmptyObject(object = {}) {
  return Object.keys(object).length === 0
}
