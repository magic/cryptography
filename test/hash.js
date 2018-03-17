const { isString, isEmpty } = require('types')

const { hash } = require('../src')

const runs = process.env.TESTRUNS || 10

const fns = [
  { fn: async () => hash('test'), runs, expect: t => t.length === 60, info: `Test for correct length of ${runs} generated hash${runs > 1 ? 'es' : ''}` },
  { fn: async () => hash('test'), runs, expect: isString, info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} a string` },
  { fn: async () => hash('test'), runs, expect: t => !isEmpty(t), info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} non-empty` },
  { fn: async () => Promise.all(Array(runs).fill('test').map(hash)), expect: t => t.length === new Set(t).size, info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} unique` },
  { fn: async () => hash(''), runs, expect: false },
  { fn: async () => hash(() => {}), runs, expect: t => t.length === 60 },
  { fn: async () => [hash(() => {}), hash(() => {})], runs, expect: t => t[0] !== t[1] },
  { fn: async () => hash(new Date()), runs, expect: t => t.length === 60 },
]

module.exports = fns
