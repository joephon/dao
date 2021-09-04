const readline = require('readline')
const { promises: { readFile, writeFile }, createReadStream } = require('fs')
const { Token, IdToken, StrToken, IntToken, FloatToken, OpToken } = require('./token')
class Scanner {
  // comment \/\/.*
  // identifier ([a-z_A-Z][a-z_A-Z0-9]*)
  // float ([0-9]+\.[0-9]+)
  // int ([0-9]+)
  // string (\"(\\"|\\n|[^\"])*\")|(\'(\\'|\\n|[^\'])*\')
  // string (\"[^\"]*\")|(\'[^\']*\')
  // other (==|<=|>=|&&|&|\|\||\||\+|\-|\*|\/|\?|:|#|\.|\^|@|\!|%|\(|\)|\[|\]|\{|\}|;|\*\*)
  static pattern = /\s*(\/\/.*)|([a-z_A-Z][a-z_A-Z0-9]*)|([0-9]+\.[0-9]+)|([0-9]+)|(\"[^\"]*\")|(\'[^\']*\')|(\*\*|!=|==|<=|>=|&&|\+=|-=|\+\+|--|\|\||\||&|=|>|<|\+|-|\*|^\/$|\?|:|#|\^|@|\!|%|\(|\)|\[|\]|\{|\}|;|\,|\.)/g
  static queue = []

  async start(filename) {
    const rs = createReadStream(filename)
    const rl = readline.createInterface({
      input: rs
    })

    let res
    let lineNumber = 0
    rl.on('line', (data) => {
      lineNumber += 1
      while ((res = Scanner.pattern.exec(data)) !== null) {
        let [matched, comment, id, float, int, str1, str2, op] = res
        const from = res.index
        const to = res.index + matched.length
        console.log(111,comment)
        if (matched) {
          if (id) {
            const idToken = new IdToken(lineNumber)
            idToken.value = matched
            idToken.from = from
            idToken.to = to
            Scanner.queue.push(idToken)
          }
          if (int) {
            const intToken = new IntToken(lineNumber)
            intToken.value = matched
            intToken.from = from
            intToken.to = to
            Scanner.queue.push(intToken)
          }
          if (float) {
            const floatToken = new FloatToken(lineNumber)
            floatToken.value = matched
            floatToken.from = from
            floatToken.to = to
            Scanner.queue.push(floatToken)
          }
          if (str1) {
            const strToken = new StrToken(lineNumber)
            strToken.value = matched
            strToken.from = from
            strToken.to = to
            Scanner.queue.push(strToken)
          }
          if (str2) {
            const strToken = new StrToken(lineNumber)
            strToken.value = matched
            strToken.from = from
            strToken.to = to
            Scanner.queue.push(strToken)
          }
          if (op) {
            const opToken = new OpToken(lineNumber)
            opToken.value = matched
            opToken.from = from
            opToken.to = to
            Scanner.queue.push(opToken)
          }
        }
        // console.log('lineNumber: ', lineNumber, 'lineStr: ', lineStr)
        // console.log('line: ', comment, id, int, float, str1, str2, op, from, to)
      }
    })

    rl.on('close', () => console.log(Scanner.queue))

  }
}

module.exports.Scanner = Scanner