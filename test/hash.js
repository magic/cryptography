const is = require('@magic/types')

const { hash } = require('../src')

const runs = process.env.RUNS || 10

const fns = [
  {
    fn: async () => hash('test'),
    runs,
    expect: is.len.eq(60),
    info: `Test lengths of ${runs} generated hash${runs > 1 && 'es'}`,
  },
  {
    fn: async () => hash('test'),
    runs,
    expect: is.string,
    info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} a string`,
  },
  {
    fn: async () => hash('test'),
    runs,
    expect: t => !is.empty(t),
    info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} non-empty`,
  },
  {
    fn: async () =>
      Promise.all(
        Array(runs)
          .fill('test')
          .map(hash),
      ),
    expect: t => is.len.eq(new Set(t), t),
    info: `Test if ${runs} hash${runs > 1 ? 'es are' : ' is'} unique`,
  },
  {
    fn: async () => await hash(''),
    runs,
    expect: is.error,
    info: 'Hashing an empty string returns an error',
  },
  { fn: async () => await hash(() => {}), runs, expect: is.len.eq(60) },
  {
    fn: async () => [await hash(() => {}), await hash(() => {})],
    runs,
    expect: t => t[0] !== t[1],
  },
  { fn: async () => await hash(new Date()), runs, expect: is.len.eq(60) },
]

module.exports = fns
