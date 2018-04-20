const bcrypt = require('bcrypt')
const { promisify } = require('util')

const { isNumber, isEmpty } = require('@magic/types')

const saltRounds = 10

const genSalt = promisify(bcrypt.genSalt)

const salt = async (rounds = saltRounds) => {
  try {
    if (rounds < 0 || !isNumber(rounds)) {
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
