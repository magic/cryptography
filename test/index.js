const { log } = require('@magic/test')

const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')
const randomNumbers = require('./random/numbers')

// suppress console.error when running quick tests
console.error = (...e) => {
  log.info(...e)
}

module.exports = {
  spec: require('./spec'),
  hash: require('./hash'),
  salt: require('./salt'),
  uuid: require('./uuid'),
  random: {
    bytes: randomBytes,
    number: randomNumber,
    numbers: randomNumbers,
  },
  words: require('./words'),
  wordlist: require('./wordlist'),
  range: require('./range'),
}
