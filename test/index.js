const { log } = require('@magic/test')

// suppress console.error when running quick tests
console.error = (...e) => {
  log.info(...e)
}

module.exports = {
  hash: require('./hash'),
  jwt: require('./jwt'),
  random: require('./random'),
  range: require('./range'),
  spec: require('./spec'),
  uuid: require('./uuid'),
  word: require('./word'),
  words: require('./words'),
  wordlist: require('./wordlist'),
}
