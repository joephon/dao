const path = require('path')
const { Scanner } = require("./core/scanner")
// ooxx
const scanner = new Scanner()
scanner.start(path.resolve('example/sample.dao'))
// uuyy