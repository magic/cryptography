const is = require('@magic/types')
const log = require('@magic/log')
const { promisify } = require('util')

const jwt = require('jsonwebtoken')

const signToken = promisify(jwt.sign)

const oneDay = 24 * 60 * 60

const defaultData = {
  exp: Math.floor(new Date().getTime() / 1000 + oneDay),
}

const sign = async (data, secret, options) => {
  data = { ...defaultData, ...data }
  try {
    if (is.empty(data)) {
      throw new Error('jwt.sign expects a data object')
    }

    return await signToken(data, secret, options)
  } catch (e) {
    log(e)
    return e
  }
}

module.exports = sign
