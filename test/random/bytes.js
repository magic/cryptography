const is = require('@magic/types')

const { randomBytes } = require('../../src')

const runs = process.env.RUNS || 100

module.exports = [
  { fn: async () => (await randomBytes()) !== (await randomBytes()) },
  { fn: async () => randomBytes(), runs, expect: is.string },
  { fn: async () => randomBytes(), runs, expect: is.len.equal(66) },
  { fn: async () => randomBytes(33), runs, expect: is.len.equal(66) },
  { fn: async () => randomBytes(44), runs, expect: is.len.equal(88) },
  { fn: async () => randomBytes(111), runs, expect: is.len.equal(222) },
  // should error when passed a string, object or array
  { fn: async () => randomBytes('not a number'), runs, expect: is.len.eq(66) },
  { fn: async () => randomBytes({}), runs, expect: is.len.eq(66) },
  { fn: async () => randomBytes([]), runs, expect: is.len.eq(66) },
  { fn: async () => randomBytes(() => 321), runs, expect: is.len.eq(66) },
]
