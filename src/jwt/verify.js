const { promisify } = require('util')

const jwt = require('jsonwebtoken')

const verifyToken = promisify(jwt.verify)

const verify = async (token, secret, options) => {
  try {
    const verified = await verifyToken(token, secret, options)
    console.log({ verified })
    return verified
  } catch (e) {
    console.error(e)
    return e
  }
}

module.exports = verify
