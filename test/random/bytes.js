const { isString, isError } = require('types')

const { randomBytes } = require('../../src')

const runs = process.env.RUNS || 100

const fns = [
  { fn: async () => await randomBytes() === await randomBytes(), runs, expect: false },
  { fn: async () => await randomBytes(), runs, expect: isString },
  { fn: async () => await randomBytes(), runs, expect: t => t.length === 66 },
  { fn: async () => await randomBytes(33), runs, expect: t => t.length === 66 },
  { fn: async () => await randomBytes(44), runs, expect: t => t.length === 88 },
  { fn: async () => await randomBytes(111), runs, expect: t => t.length === 222 },
  // should error when passed a string, object or array
  { fn: async () => { try { await randomBytes('not a number')} catch(e) { return e }}, runs, expect: isError },
  { fn: async () => { try { await randomBytes({})} catch(e) { return e }}, runs, expect: isError },
  { fn: async () => { try { await randomBytes([])} catch(e) { return e }}, runs, expect: isError },
  { fn: async () => { try { await randomBytes(() => { return 321 })} catch(e) { return e }}, runs, expect: isError },
]

module.exports = fns
