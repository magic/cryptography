const random = require('./random')

const salt = require('./salt')
const hash = require('./hash')

const uuid = require('./uuid')
const { words, word } = require('./words')
const wordlist = require('./wordlist')

module.exports = {
  hash,
  salt,
  uuid,
  random,
  randomBytes: random.bytes,
  randomNumber: random.number,
  randomNumbers: random.numbers,
  words,
  word,
  wordlist,
}
