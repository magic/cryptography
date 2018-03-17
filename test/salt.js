const c = require('../src')

const runs = process.env.RUNS || 10

const fns = [
  { fn: () => c.salt(), runs, expect: t => t.indexOf('$') === 0 },
  { fn: () => c.salt(), runs, expect: t => t.length === 29 },
]

module.exports = fns
