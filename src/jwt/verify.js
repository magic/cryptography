const { promisify } = require('util')

const jwt = require('jsonwebtoken')

const verifyToken = promisify(jwt.verify)

const verify = async (token, secret, options) => {
  // options.algorithm = 'HS256'
  // options.expiresIn = '10h'
  try {
    return await verifyToken(token, secret, options)
  } catch (e) {
    console.error(e)
    return e
  }
}

module.exports = verify
