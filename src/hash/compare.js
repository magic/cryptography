const { promisify } = require('util')

const argon2 = require('argon2')

const is = require('@magic/types')
const log = require('@magic/log')

const isValidArg = a => is.string(a)

const transform = a => {
  if (is.date(a)) {
    return a.getTime().toString()
  } else if (is.regexp(a)) {
    return a.toString()
  } else if (is.function(a)) {
    return a.toString()
  } else if (is.object(a) || is.array(a)) {
    return JSON.stringify(a)
  } else if (!is.string(a) && is.fn(a.toString)) {
    return a.toString()
  } else {
    return a
  }
}

const compare = async (a, b) => {
  // cheap exit
  if (is.empty(a) || is.empty(b)) {
    return false
  }

  // both args not a string
  if (!is.string(a) && !is.string(b)) {
    return false
  }

  let strings = [a, b].map(transform).filter(isValidArg).sort()

  if (strings[0].indexOf('$') !== 0) {
    return false
  }

  return await argon2.verify(...strings)
}

module.exports = compare
