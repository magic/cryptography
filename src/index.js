const random = require('./random')
const hash = require('./hash')
const { words, word } = require('./words')

module.exports = {
  hash: require('./hash'),
  uuid: require('./uuid'),
  random,
  randomBytes: random.bytes,
  randomNumber: random.number,
  randomNumbers: random.numbers,
  words,
  word,
  wordlist: require('./wordlist'),
}
