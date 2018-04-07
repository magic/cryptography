const c = require('../src')
const { isFunction, isObject, isArray } = require('@magic/types')

const fns = [
  { fn: () => c.hash, expect: isFunction },
  { fn: () => c.salt, expect: isFunction },
  { fn: () => c.uuid, expect: isObject },
  { fn: () => c.uuid.v4, expect: isFunction },
  { fn: () => c.uuid.v5, expect: isFunction },
  { fn: () => c.random, expect: isObject },
  { fn: () => c.random.bytes, expect: isFunction },
  { fn: () => c.random.number, expect: isFunction },
  { fn: () => c.randomBytes, expect: isFunction },
  { fn: () => c.randomNumber, expect: isFunction },
  { fn: () => c.words, expect: isFunction },
  { fn: () => c.wordlist, expect: isArray },
]

module.exports = fns
