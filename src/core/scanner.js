const readline = require('readline')
const { promises: { readFile, writeFile }, createReadStream } = require('fs')

class Scanner {
  // comment \/\/.*
  // number ([0-9]+)
  // identifier ([a-z_A-Z][a-z_A-Z0-9]*)
  // string (\"(\\"|\\n|[^\"])*\")|(\'(\\'|\\n|[^\'])*\')
  // string (\"[^\"]*\")|(\'[^\']*\')
  // other (==|<=|>=|&&|&|\|\||\||\+|\-|\*|\/|\?|:|#|\.|\^|@|\!|%|\(|\)|\[|\]|\{|\}|;|\*\*)
  static pattern = /\s*(\/\/.*)|([a-z_A-Z][a-z_A-Z0-9]*)|([0-9]+)|(\"[^\"]*\")|(\'[^\']*\')|(=|\!=|==|<=|>=|&&|&|\|\||\||\+|\-|\*|\/|\?|:|#|\.|\^|@|\!|%|\(|\)|\[|\]|\{|\}|;|\*\*)/g

  async start(filename) {
    const rs = createReadStream(filename)
    const rl = readline.createInterface({
      input: rs
    })

    let res
    let lineNumber = 0
    rl.on('line', (data) => {
      lineNumber += 1
      console.log('lineNumber: ', lineNumber)
      while ((res = Scanner.pattern.exec(data)) !== null) {
        let [matched, comment, id, no, str1, str2, op] = res
        const from = res.index
        const to = res.index + matched.length
        console.log(res.length)
        console.log('line: ', comment, id, no, str1, str2, op, from, to)
      }
    })

  }
}

module.exports.Scanner = Scanner