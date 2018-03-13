const { isString, isEmpty } = require('types')

const { hash, random } = require('../src')

const runs = process.env.TESTRUNS || 10

const fns = [
  { fn: async () => await hash('test'), runs, expect: t => t.length === 60, info: `Test for correct length of ${runs} generated hash${runs > 1 ? 'es' : ''}` },
  { fn: async () => await hash('test'), runs, expect: isString, info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} a string` },
  { fn: async () => await hash('test'), runs, expect: t => !isEmpty(t), info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} non-empty` },
  { fn: async () => await Promise.all(Array(runs).fill('test').map(hash)), expect: t => t.length === new Set(t).size, info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} unique` },
]

module.exports = fns
//
// ava(`genHash for collision ${runs} times`, async t => {
//   for (let i = 0; i < runs; i++) {
//     const hash = await genHash('test')
//     t.true(hashes.indexOf(hash) === -1)
//     t.true(hash.length === 60)
//     t.true(typeof hash === 'string')
//
//     hashes.push(hash)
//   }
// })
//
// ava(`genHash returns an error if no value is sent`, async t => {
//   await t.notThrows(genHash())
//
//   const error = await genHash()
//
//   t.true(error instanceof Error)
// })
