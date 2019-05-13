import is from '@magic/types'
import words from '../src/words.mjs'

const runs = process.env.RUNS || 1

export default [
  {
    fn: async () => await words(12),
    runs,
    expect: w => is.len.eq(w, new Set(w)),
    info: `Test single list of words for uniqueness ${runs} times`,
  },
  {
    fn: async () => new Set(await words(12)),
    runs,
    expect: is.len.eq(12),
    info: `Test number of returned words ${runs} times`,
  },
  {
    fn: async () => await words(12),
    runs,
    expect: async t => !is.deep.equal(t, await words(12)),
    info: `Test 2 lists of words for uniqueness ${runs} times`,
  },
  {
    fn: async () => await words('test'),
    runs,
    expect: is.len.eq(1),
    info: `Test non number argument`,
  },
  {
    fn: async () => await words(-1),
    runs,
    expect: async t => !is.deep.equal(t, await words(1)),
    info: `Test negative number argument`,
  },
  {
    fn: async () => await words(),
    runs,
    expect: is.len.equal(1),
    info: `Test words for length if no arg is provided`,
  },
]
