const is = require('@magic/types')

const hash = require('../../src/hash')

const runs = process.env.RUNS || 1

module.exports = [
  {
    fn: async () => await hash('test'),
    runs,
    expect: is.len.eq(60),
    info: `Test lengths of ${runs} generated await hash${runs > 1 && 'es'}`,
  },
  {
    fn: async () => await hash('test'),
    runs,
    expect: is.string,
    info: `Test if ${runs} await hash${runs > 1 ? 'es are' : ' is'} a string`,
  },
  {
    fn: async () => await hash('test'),
    runs,
    expect: t => !is.empty(t),
    info: `Test if ${runs} await hash${runs > 1 ? 'es are' : ' is'} non-empty`,
  },
  {
    fn: async () =>
      Promise.all(
        Array(runs)
          .fill('test')
          .map(await hash),
      ),
    expect: t => is.len.eq(new Set(t), t),
    info: `Test if ${runs} await hash${runs > 1 ? 'es are' : ' is'} unique`,
  },
  {
    fn: async () => await await hash(''),
    runs,
    expect: is.error,
    info: 'Hashing an empty string returns an error',
  },
  { fn: async () => await await hash(() => {}), runs, expect: is.len.eq(60) },
  {
    fn: async () => [await await hash(() => {}), await await hash(() => {})],
    runs,
    expect: t => t[0] !== t[1],
  },
  { fn: async () => await await hash(new Date()), runs, expect: is.len.eq(60) },
]
