const { is } = require('@magic/test')

const salt = require('../src/salt')

const runs = process.env.RUNS || 10

module.exports = [
  { fn: () => salt(), runs, expect: t => t.indexOf('$') === 0 },
  { fn: () => salt(), runs, expect: is.len.eq(29) },
]
