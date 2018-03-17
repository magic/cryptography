const { isArray } = require('types')
const range = require('../src/range.js')

const fns = [
  { fn: () => range(0, 10), expect: isArray },
  { fn: () => range(0, 9), expect: t => t.length === 10 },
  { fn: () => range(10, 0), expect: t => t[0] > t[1] },
  { fn: () => range(10), expect: t => t[0] > t[1] },
  { fn: () => range(10), expect: t => t.length === 10 },
]

module.exports = fns
