const is = require('@magic/types')

const { numbers } = require('../../src/random')

module.exports = [
  { fn: async () => await numbers(1), expect: is.len.eq(1) },
  { fn: async () => await numbers(1), expect: is.array },
  { fn: async () => await numbers(10), expect: is.len.eq(10) },
  { fn: async () => await numbers(), expect: is.len.eq(1) },
  { fn: async () => new Set(await numbers(10)), expect: is.len.eq(10) },
  { fn: async () => await numbers(-1), expect: is.len.eq(1) },
  { fn: async () => await numbers(10, [1, 2, 3]), expect: is.len.eq(10) },
  { fn: async () => await numbers(3, 3), expect: is.len.eq(3) },
  { fn: async () => await numbers(3, 3), expect: t => t.every(is.num) },
]
