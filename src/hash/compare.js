const { promisify } = require('util')

const argon2 = require('argon2')

const is = require('@magic/types')
const log = require('@magic/log')

const isValidArg = a => is.string(a) && !is.empty(a)

const transform = (a = '') => is.fn(a.toString) ? a.toString() : a

const compare = async (a, b) => {
  // cheap exit
  if (!a || !b) {
    return false
  }

  let strings = [a, b].map(transform).filter(isValidArg)
  if (strings[0].indexOf('$') !== 0 && strings[1].indexOf('$') === 0) {
    strings = [strings[1], strings[0]]
  }

  if (strings.length !== 2) {
    return false
  }

  return await argon2.verify(...strings)
}

module.exports = compare
