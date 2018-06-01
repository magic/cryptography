const { is, tryCatch } = require('@magic/test')

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

const tryOut = async a => {
  try {
    const signed = await jwt.sign(a)
    return await jwt.verify(signed)
  } catch (e) {
    return e
  }
}

module.exports = [
  { fn: jwt.sign({ t: 't' }), expect: is.len.lt(200) },
  // not working now :(
  // { fn: compareJwt({ t: 't' }, { t: 't' }), expect: ([a], [b]) => a === b },
  // { fn: compareJwt({ t: 't' }, { t: 't' }), expect: ([aHash, aObj], [bHash, bObj]) => aObj.iss === bObj.iss },
  {
    fn: async () => (await jwt.sign({ t: 't' })) === (await jwt.sign({ t: 't2' })),
    expect: false,
  },
  { fn: jwt.sign({ t: 't' }), expect: is.string },
  { fn: jwt.sign('testing'), expect: is.string },
  { fn: jwt.sign(1234), expect: is.string },
  { fn: jwt.sign(), expect: is.string },
  { fn: tryCatch(jwt.sign, { exp: 12345 }), expect: is.error },
  { fn: tryOut({ jwtid: 12345 }), expect: t => t.jwtid === 12345 },
  { fn: tryOut({ t: 12345 }), expect: t => t.t === 12345 },
  { fn: tryOut({ iss: 'test' }), expect: is.error },
  { fn: tryOut({ aud: 'test' }), expect: is.error },
  { fn: tryOut({ nbf: 12345 }), expect: t => t.nbf === 12345 },
  { fn: tryOut({ exp }), expect: t => t.exp === exp },
]
