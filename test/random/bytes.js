const { isString } = require('@magic/types')

const { randomBytes } = require('../../src')

const runs = process.env.RUNS || 100

const fns = [
  {
    fn: async () => randomBytes(),
    runs,
    expect: async t => t !== randomBytes(),
  },
  { fn: async () => randomBytes(), runs, expect: isString },
  { fn: async () => randomBytes(), runs, expect: t => t.length === 66 },
  { fn: async () => randomBytes(33), runs, expect: t => t.length === 66 },
  { fn: async () => randomBytes(44), runs, expect: t => t.length === 88 },
  { fn: async () => randomBytes(111), runs, expect: t => t.length === 222 },
  // should error when passed a string, object or array
  {
    fn: async () => randomBytes('not a number'),
    runs,
    expect: t => t.length === 66,
  },
  { fn: async () => randomBytes({}), runs, expect: t => t.length === 66 },
  { fn: async () => randomBytes([]), runs, expect: t => t.length === 66 },
  {
    fn: async () =>
      randomBytes(() => {
        return 321
      }),
    runs,
    expect: t => t.length === 66,
  },
]

module.exports = fns
