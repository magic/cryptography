const { is } = require('@magic/test')

const range = require('../src/range.js')

const fns = [
  { fn: () => range(0, 10), expect: is.array },
  { fn: () => range(0, 9), expect: is.len.eq(10) },
  { fn: () => range(10, 0), expect: t => t[0] > t[1] },
  { fn: () => range(10), expect: t => t[0] > t[1] },
  { fn: () => range(10), expect: is.len.eq(10) },
]

module.exports = fns
