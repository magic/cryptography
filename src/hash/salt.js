const bcrypt = require('bcrypt')
const { promisify } = require('util')

const is = require('@magic/types')

const saltRounds = 10

const genSalt = promisify(bcrypt.genSalt)

const salt = async (rounds = saltRounds) => {
  try {
    if (rounds < 0 || !is.number(rounds)) {
      rounds = saltRounds
    }

    const salt = genSalt(rounds)
    if (!salt) {
      throw new Error(`Invalid salt generated: ${salt}`)
    }

    return salt
  } catch (e) {
    log.error(e)
    return e
  }
}

module.exports = salt
