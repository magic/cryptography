const randomNumber = require('./random/number')
const wordlist = require('./wordlist')
const range = require('./range')

const params = {
  min: 0,
  max: wordlist.length - 1,
}

const word = async () => wordlist[await randomNumber(params)]

const words = async (count = 10) => Promise.all(range(count).map(word))

module.exports = {
  word,
  words,
}
