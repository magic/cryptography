const { run } = require('test')

const hash = require('./hash')
const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')
const uuid = require('./uuid')

const tests = {
  hash,
  uuid,
  random: {
    bytes: randomBytes,
    number: randomNumber,
  },
}

run(tests)
