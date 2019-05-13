import is from '@magic/types'

import hash from '../../src/hash/index.mjs'

const runs = process.env.RUNS || 1

const fn = () => {}

export default [
  {
    fn: async () => await hash.compare(await hash('test'), 'test'),
    runs,
    info: `compare strings succeeds with valid order`,
  },
  {
    fn: async () => await hash.compare('test', await hash('test')),
    runs,
    info: `compare strings succeeds with invalid order`,
  },
  {
    fn: async () => await hash.compare(123, await hash('123')),
    runs,
    info: `Compare numbers succeeds`,
  },
  {
    fn: async () => await hash.compare('', await hash('123')),
    runs,
    expect: false,
    info: `empty argument returns false`,
  },
  {
    fn: async () => await hash.compare(),
    runs,
    expect: false,
    info: `empty argument returns false`,
  },
  {
    fn: async () => await hash.compare('test2', await hash('test')),
    runs,
    expect: false,
    info: `compare strings fails for different strings`,
  },
  {
    fn: async () => await hash.compare('', 'test'),
    expect: false,
    info: `compare empty string`,
  },
  {
    fn: async () => await hash.compare(12345, await hash('1234')),
    runs,
    expect: false,
    info: `compare numbers fails for different numbers`,
  },
  {
    fn: async () => await hash.compare({}, await hash('1234')),
    runs,
    expect: false,
    info: `objects do compare falsy`,
  },
  {
    fn: async () => await hash.compare([], await hash('1234')),
    runs,
    expect: false,
    info: `arrays compare falsy`,
  },
  {
    fn: async () => await hash.compare([], await hash([])),
    runs,
    expect: false,
    info: `two empty arrays return false`,
  },
  {
    fn: async () => await hash.compare(() => {}, await hash(() => {})),
    runs,
    info: `compare functions`,
  },
  {
    fn: async () => await hash.compare(() => ({}), await hash(() => {})),
    runs,
    expect: false,
    info: `different function returns false`,
  },
  {
    fn: async () => await hash.compare({ id: 'test' }, await hash({ id: 'test' })),
    runs,
    info: `dates compare if within 1000 ms of eachother`,
  },
  {
    fn: async () => await hash.compare(new Date(1), await hash(new Date(1))),
    runs,
    info: `dates compare by getTime()`,
  },
  {
    fn: async () => await hash.compare(new Date(1), await hash(new Date(2))),
    runs,
    expect: false,
    info: `dates compare ms exact`,
  },
  {
    fn: async () => await hash.compare(new Date(1), await hash(new Date(1000))),
    runs,
    expect: false,
    info: `dates differing by more than 999 milliseconds return false`,
  },
  {
    fn: async () => await hash.compare([1], [1]),
    expect: false,
    info: `two non strings return false`,
  },
  {
    fn: async () => await hash.compare('testing', 'testing'),
    expect: false,
    info: `two non hashes return false`,
  },
  {
    fn: async () => await hash.compare(/reg/, await hash(/reg/)),
    runs,
    info: `equal regexps compare correctly`,
  },
  {
    fn: async () => await hash.compare(/rege/, await hash(/reg/)),
    runs,
    expect: false,
    info: `different regexps compare correctly`,
  },
]
