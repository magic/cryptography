const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')
const randomNumbers = require('./random/numbers')

const salt = require('./salt')
const hash = require('./hash')

const uuid = require('./uuid')
const { words, word } = require('./words')
const wordlist = require('./wordlist')

module.exports = {
  hash,
  salt,
  uuid,
  random: {
    bytes: randomBytes,
    number: randomNumber,
    numbers: randomNumbers,
  },
  randomBytes,
  randomNumber,
  randomNumbers,
  words,
  word,
  wordlist,
}
