const is = require('@magic/types')

const { bytes } = require('../../src/random')

const runs = process.env.RUNS || 1

module.exports = [
  { fn: async () => (await bytes()) !== (await bytes()) },
  { fn: async () => await bytes(), runs, expect: is.string },
  { fn: async () => await bytes(), runs, expect: is.len.equal(66) },
  { fn: async () => await bytes(33), runs, expect: is.len.equal(66) },
  { fn: async () => await bytes(44), runs, expect: is.len.equal(88) },
  { fn: async () => await bytes(111), runs, expect: is.len.equal(222) },
  // should error when passed a string, object or array
  { fn: async () => await bytes('not a number'), runs, expect: is.len.eq(66) },
  { fn: async () => await bytes({}), runs, expect: is.len.eq(66) },
  { fn: async () => await bytes([]), runs, expect: is.len.eq(66) },
  { fn: async () => await bytes(() => 321), runs, expect: is.len.eq(66) },
]
