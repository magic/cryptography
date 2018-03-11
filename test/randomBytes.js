const randomBytes = require('../src/randomBytes')

const runs = process.env.RUNS || 100

const fns = [
  { fn: () => randomBytes() === randomBytes(), runs: 100, expect: false },
  { fn: async () => { const b = await randomBytes(); return b.length }, expect: 66 },
]

module.exports = fns
