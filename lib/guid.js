module.exports = (l = 7) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let text = ''
  for (let i=0; i<l; i++) {
    const rd = Math.floor(Math.random() * possible.length)
    text += possible[rd]
  }
  return text;
}