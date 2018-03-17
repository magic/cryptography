const randomBytes = require('./random/bytes')
const randomNumber = require('./random/number')

const salt = require('./salt')
const hash = require('./hash')

const uuid = require('./uuid')

// suppress console.error
console.error = () => {}

module.exports = {
  hash,
  salt,
  uuid,
  random: {
    bytes: randomBytes,
    number: randomNumber,
  },
  randomBytes,
  randomNumber,
}
