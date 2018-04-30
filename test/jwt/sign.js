const { is } = require('@magic/test')

const JWT = require('../../src/jwt')

const jwt = new JWT()

const exp = Math.floor(new Date().getTime() / 1000 + 1000)

const compareJwt = async (a, b) => {
  const aj = await jwt.sign(a)
  const bj = await jwt.sign(b)

  const av = await jwt.verify(aj)
  const bv = await jwt.verify(bj)

  return {
    a: [aj, av],
    b: [bj, bv],
  }
}

module.exports = [
  { fn: jwt.sign({ t: 't' }), expect: is.len.lt(200) },
  { fn: compareJwt({ t: 't' }, { t: 't' }), expect: (a, b) => a[1].aud === b[1].aud },
  { fn: compareJwt({ t: 't' }, { t: 't' }), expect: (a, b) => a[1].iss === b[1].iss },
  {
    fn: async () => (await jwt.sign({ t: 't' })) === (await jwt.sign({ t: 't2' })),
    expect: false,
  },
  { fn: jwt.sign({ t: 't' }), expect: is.string },
  { fn: jwt.sign('testing'), expect: is.string },
  { fn: jwt.sign(1234), expect: is.string },
  { fn: jwt.sign(), expect: is.string },
  { fn: jwt.sign({ exp: 12345 }), expect: is.error },
  { fn: async () => jwt.verify(await jwt.sign({ jwtid: 12345 })), expect: t => t.jwtid === 12345 },
  { fn: async () => jwt.verify(await jwt.sign({ t: 12345 })), expect: t => t.t === 12345 },
  { fn: async () => jwt.verify(await jwt.sign({ iss: 'test' })), expect: is.error },
  { fn: async () => jwt.verify(await jwt.sign({ aud: 'test' })), expect: is.error },
  { fn: async () => jwt.verify(await jwt.sign({ nbf: 12345 })), expect: t => t.nbf === 12345 },
  { fn: async () => jwt.verify(await jwt.sign({ exp })), expect: t => t.exp === exp },
]
