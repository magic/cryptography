const { run } = require('test')

const moduleexports = require('./exports')
const hash = require('./hash')
const salt = require('./salt')
const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')
const uuid = require('./uuid')

const tests = {
  moduleexports,
  hash,
  salt,
  uuid,
  random: {
    bytes: randomBytes,
    number: randomNumber,
  },
}

run(tests)
