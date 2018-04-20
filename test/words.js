const is = require('@magic/types')
const c = require('../src/words')

const runs = process.env.RUNS || 1

const fns = [
  {
    fn: async () => c.words(12),
    runs,
    expect: w => w.length === new Set(w).size,
    info: `Test words for uniqueness ${runs} times`,
  },
  {
    fn: async () => c.words(12),
    runs,
    expect: w => new Set(w).size === 12,
    info: `Test number of returned words ${runs} times`,
  },
  {
    fn: async () => await c.words(12),
    runs,
    expect: t => !is.deep.equal(t, c.words(12)),
  },
  { fn: async () => c.word(), runs, expect: is.string },
]

module.exports = fns
