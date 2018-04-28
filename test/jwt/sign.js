const { is } = require('@magic/test')

const JWT = require('../../src/jwt')

const jwt = new JWT()

const exp = Math.floor(new Date().getTime() / 1000 + 1000)

module.exports = [
  { fn: async () => jwt.sign({ t: 't' }), expect: t => is.len.gt(t, 200) },
  {
    fn: async () => jwt.sign({ t: 't' }),
    expect: async () =>jwt.sign({ t: 't' }),
  },
  {
    fn: async () => (await jwt.sign({ t: 't' })) === (await jwt.sign({ t: 't2' })),
    expect: false,
  },
  { fn: async () => jwt.sign({ t: 't' }), expect: is.string },
  { fn: async () => jwt.sign('testing'), expect: is.string },
  { fn: async () => jwt.sign(1234), expect: is.string },
  { fn: async () => jwt.sign(), expect: is.string },
  { fn: async () => jwt.sign({ exp: 12345 }), expect: is.error },
  { fn: async () => jwt.verify(await jwt.sign({ jwtid: 12345 })), expect: t => t.jwtid === 12345 },
  { fn: async () => jwt.verify(await jwt.sign({ t: 12345 })), expect: t => t.t === 12345 },
  { fn: async () => jwt.verify(await jwt.sign({ iss: 'test' })), expect: is.error },
  { fn: async () => jwt.verify(await jwt.sign({ aud: 'test' })), expect: is.error },
  { fn: async () => jwt.verify(await jwt.sign({ nbf: 12345 })), expect: t => t.nbf === 12345 },
  { fn: async () => jwt.verify(await jwt.sign({ exp })), expect: t => t.exp === exp },
]
