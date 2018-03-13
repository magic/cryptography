const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')

const hash = require('./hash')

module.exports = {
  hash,
  random: {
    bytes: randomBytes,
    number: randomNumber,
  },
  randomBytes,
  randomNumber,
}
