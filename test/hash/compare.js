const is = require('@magic/types')

const hash = require('../../src/hash')

const runs = process.env.RUNS || 1

module.exports = [
  {
    fn: async () => await hash.compare('test', await hash('test')),
    runs,
    info: `compare strings succeeds`,
  },
  {
    fn: async () => await hash.compare(123, await hash('123')),
    runs,
    info: `Compare numbers succeeds`,
  },
  {
    fn: async () => await hash.compare('test2', await hash('test')),
    runs,
    expect: false,
    info: `compare strings fails for different strings`,
  },
  {
    fn: async () => await hash.compare('', 'test'),
    expect: undefined,
    info: `compare empty string`,
  },
  {
    fn: async () => await hash.compare(12345, await hash('1234')),
    runs,
    expect: false,
    info: `compare numbers fails for different numbers`,
  },
]
