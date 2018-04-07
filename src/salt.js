const bcrypt = require('bcrypt')
const { promisify } = require('util')

const { isNumber, isEmpty } = require('@magic/types')

const saltRounds = 10

const genSalt = promisify(bcrypt.genSalt)

const salt = async (rounds = saltRounds) => {
  try {
    if (isEmpty(rounds) || !isNumber(rounds)) {
      rounds = saltRounds
    }

    const salt = genSalt(rounds)
    /* istanbul ignore if */
    if (!salt) {
      throw new Error(`Invalid salt generated: ${salt}`)
    }

    return salt
  }
  catch (e) {
    /* istanbul ignore next */
    throw e
  }
}

module.exports = salt
