const { isString } = require('types')
const c = require('../src/words')

const runs = process.env.RUNS || 1

const fns = [
  { fn: async () => c.words(12), runs, expect: w => w.length === new Set(w).size, info: `Test words for uniqueness ${runs} times` },
  { fn: async () => c.words(12), runs, expect: w => new Set(w).size === 12, info: `Test number of returned words ${runs} times` },
  { fn: async () => Promise.all([c.words(12), c.words(12)]), runs, expect: t => JSON.stringify(t[0]) !== JSON.stringify(t[1]) },
  { fn: async () => c.word(), runs, expect: isString },
]

module.exports = fns
