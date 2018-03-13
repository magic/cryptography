const { run } = require('test')

const hash = require('./hash')
const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')

const tests = {
  hash,
  random: {
    bytes: randomBytes,
    number: randomNumber,
  },
}

run(tests)
