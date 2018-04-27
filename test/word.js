const is = require('@magic/types')
const word = require('../src/word')

const runs = process.env.RUNS || 1

module.exports = [{ fn: async () => word(), runs, expect: is.string }]
