const generateCode = (n = 6) => {
  let code = ''
  for(let i = 0 ; i < n ; i++){
    code += parseInt(Math.random() * 10)
  }
  return code
}

module.exports = {
  generateCode
}