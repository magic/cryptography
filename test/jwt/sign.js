const { is } = require('@magic/test')
const jwt = require('../../src/jwt')

const sign = async v => await jwt.sign(v, 'secret')

module.exports = [
  {
    fn: async () => await jwt.sign({ t: 't' }, 'secret'),
    expect: t => console.log({ t: t.length }) || is.len.eq(132),
  },
  {
    fn: async () => await sign({ t: 't' }),
    expect: async () => await sign({ t: 't' }),
  },
  {
    fn: async () => (await sign({ t: 't' })) === (await sign({ t: 't2' })),
    expect: false,
  },
  { fn: async () => await sign({ t: 't' }), expect: is.string },
  { fn: async () => await sign('testing'), expect: is.string },
  { fn: async () => await sign(01234), expect: is.string },
]
