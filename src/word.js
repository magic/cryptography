const randomNumber = require('./random/number')
const wordlist = require('./wordlist')

const params = {
  min: 0,
  max: wordlist.length - 1,
}

const word = async () => wordlist[await randomNumber(params)]

module.exports = word
