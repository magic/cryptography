import argon2 from 'argon2'

import is from '@magic/types'

const defaultOptions = { timeCost: 4, memoryCost: 8192, parallelism: 2, type: argon2.argon2d }

export const hash = async (val, options = {}) => {
  try {
    if (is.empty(val)) {
      throw new Error('@magic/cryptography:hash called without valid argument')
    }

    if (is.date(val)) {
      val = val.getTime().toString()
    }

    if (is.function(val)) {
      val = val.toString()
    }

    if (is.regexp(val)) {
      val = val.toString()
    }

    if (is.array(val) || is.object(val)) {
      val = JSON.stringify(val)
    }

    if (!is.string(val) && is.fn(val.toString)) {
      val = val.toString()
    }

    /* istanbul ignore if */
    if (!is.string(val)) {
      throw new Error('@magic/cryptography:hash val is not convertable to string')
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
    // log.error('genHash:', e)
    return e
  }
}

export default hash
