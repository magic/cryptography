const { promisify } = require('util')

const bcrypt = require('bcrypt')

const is = require('@magic/types')
const log = require('@magic/log')

const compareHash = promisify(bcrypt.compare)

const isValidArg = a => is.string(a) && !is.empty(a)

const transform = a => (a && is.fn(a.toString) ? a.toString() : a)

const compare = async (a, b) => {
  const isValid = [a, b].filter(isValidArg).map(transform)

  if (!isValid) {
    return false
  }

  const compared = await compareHash('' + a, '' + b)
  return compared
}

module.exports = compare
