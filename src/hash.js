const bcrypt = require('bcrypt')
const { promisify } = require('util')
const { isFunction, isEmpty, isString, isDate } = require('types')

const genSalt = require('./salt')

const genHash = promisify(bcrypt.hash)

const hash = async (val, rounds) => {
  try {
    if (isDate(val) || isFunction(val)) {
      val = val.toString()
    }

    if (isEmpty(val) || !isString(val)) {
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
  }
  catch (e) {
    console.error('genHash:', e)
    return false
  }
}

module.exports = hash
