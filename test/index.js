const { run } = require('test')

const moduleexports = require('./exports')
const hash = require('./hash')
const salt = require('./salt')
const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')
const uuid = require('./uuid')

const words = require('./words')
const wordlist = require('./wordlist')
const range = require('./range')

// suppress console.error
console.error = () => {}

const tests = {
  moduleexports,
  hash,
  salt,
  uuid,
  random: {
    bytes: randomBytes,
    number: randomNumber,
  },
  words,
  wordlist,
  range,
}

run(tests)
