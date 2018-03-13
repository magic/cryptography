const bcrypt = require('bcrypt')
const { promisify } = require('util')

const { isFunction } = require('types')

const saltRounds = 10

const genSalt = promisify(bcrypt.genSalt)
const genHash = promisify(bcrypt.hash)

const hash = async val => {
  try {
    if (!val) {
      return new Error('genHash called without a string')
    }

    if (isFunction(val.toString)) {
      val = val.toString()
    }

    const hash = await genHash(val, saltRounds)
    if (!hash) {
      return new Error('Invalid hash generated')
    }

    return hash
  }
  catch(e) {
    console.error('genHash', e)
    return e
  }
}

module.exports = hash
