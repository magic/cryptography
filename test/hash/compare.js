const is = require('@magic/types')

const hash = require('../../src/hash')

const runs = process.env.RUNS || 1

const fn = () => {}

module.exports = [
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
    fn: async () => await hash.compare(new Date(1), await hash(new Date(1))),
    runs,
    info: `dates compare if within 1000 ms of eachother`,
  },
  {
    fn: async () => await hash.compare(new Date(1), await hash(new Date(999))),
    runs,
    info: `dates compare if within 1000 ms of eachother`,
  },
  {
    fn: async () => await hash.compare(new Date(1), await hash(new Date(1000))),
    runs,
    expect: false,
    info: `dates differing by more than 999 milliseconds return false`,
  },
]
