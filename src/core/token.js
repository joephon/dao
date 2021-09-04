class Token {
  static EOF = new Token(-1)
  static EOL = '\n'

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

class IntToken extends Token {
  constructor(line) {
    super(line)
  }
}

class FloatToken extends Token {
  constructor(line) {
    super(line)
  }
}

class OpToken extends Token {
  constructor(line) {
    super(line)
  }
}

module.exports = {
  Token, IdToken, StrToken, IntToken, FloatToken, OpToken,
}