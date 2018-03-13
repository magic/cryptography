const { run } = require('test')

const randomBytes = require('./randomBytes')
const randomNumber = require('./randomNumber')

const tests = {
  randomBytes,
  randomNumber,
}

run(tests)
