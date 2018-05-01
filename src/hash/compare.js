const { promisify } = require('util')

const bcrypt = require('bcrypt')

const is = require('@magic/types')
const log = require('@magic/log')

const compareHash = promisify(bcrypt.compare)

const isValidArg = a => is.string(a) && !is.empty(a)

const transform = a => (a && is.fn(a.toString) ? a.toString() : a)

const compare = async (a, b) => {
  const strings = [a, b].map(transform).filter(isValidArg)

  if (strings.length !== 2) {
    return false
  }

  const compared = await compareHash(...strings)
  return compared
}

module.exports = compare
