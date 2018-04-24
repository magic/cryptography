const is = require('@magic/types')

const { randomNumbers } = require('../../src')

module.exports = [
  { fn: async () => await randomNumbers(1), expect: is.len.eq(1) },
  { fn: async () => await randomNumbers(10), expect: is.len.eq(10) },
  { fn: async () => new Set(await randomNumbers(10)), expect: is.len.eq(10) },
]
