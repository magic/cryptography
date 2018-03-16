const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')

const hash = require('./hash')

const uuid = require('./uuid')

module.exports = {
  hash,
  uuid,
  random: {
    bytes: randomBytes,
    number: randomNumber,
  },
  randomBytes,
  randomNumber,
}
