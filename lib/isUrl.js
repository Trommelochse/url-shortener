module.exports = str => {
  if (typeof str !== 'string') {
    return false
  }
  if (/^http(s)?:\/\//.test(str)) {
    return true
  }
  return false
}