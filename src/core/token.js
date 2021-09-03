class Token {
  static EOF = new Token(-1)
  static EOL = '\\n'

  constructor(line) {
    this.lineNumber = line
  }
}

class IdToken extends Token {
  constructor(line) {
    super(line)
  }
}

class StrToken extends Token {
  constructor(line) {
    super(line)
  }
}

class NumToken extends Token {
  constructor(line) {
    super(line)
  }
}

module.exports = {
  Token, IdToken, StrToken, NumToken,
}