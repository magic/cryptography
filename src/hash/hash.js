const { promisify } = require('util')

const argon2 = require('argon2')

const is = require('@magic/types')
const log = require('@magic/log')

const defaultOptions = { timeCost: 4, memoryCost: 8192, parallelism: 2, type: argon2.argon2d }

const hash = async (val, options = {}) => {
  try {
    if (is.date(val) || is.function(val)) {
      val = val.toString()
    }

    if (is.empty(val) || !is.string(val)) {
      throw new Error('genHash called without a string')
    }

    options = {
      ...defaultOptions,
      ...options,
    }

    const hash = await argon2.hash(val, options)
    /* istanbul ignore if */
    if (!hash) {
      throw new Error('Invalid hash generated')
    }

    return hash
  } catch (e) {
    log.error('genHash:', e)
    return e
  }
}

module.exports = hash
