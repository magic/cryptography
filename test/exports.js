const c = require('../src')
const { isFunction, isObject } = require('types')

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
]

module.exports = fns
