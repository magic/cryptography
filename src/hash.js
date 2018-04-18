const bcrypt = require('bcrypt')
const { promisify } = require('util')

const is = require('@magic/types')

const genSalt = require('./salt')

const genHash = promisify(bcrypt.hash)

const hash = async (val, rounds) => {
  try {
    if (is.date(val) || is.function(val)) {
      val = val.toString()
    }

    if (is.empty(val) || !is.string(val)) {
      throw new Error('genHash called without a string')
    }

    const salt = await genSalt(rounds)
    /* istanbul ignore if */
    if (!salt) {
      throw new Error('Invalid salt generated')
    }

    const hash = await genHash(val, salt)
    /* istanbul ignore if */
    if (!hash) {
      throw new Error('Invalid hash generated')
    }

    return hash
  } catch (e) {
    console.error('genHash:', e)
    return e
  }
}

module.exports = hash
