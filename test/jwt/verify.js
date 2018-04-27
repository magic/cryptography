const { is } = require('@magic/test')

const jwt = require('../../src/jwt')

const sign = async v => await jwt.sign(v, 'secret')
const verify = async v => await jwt.verify(v, 'secret')

const t = async o => {
  const s = await sign(o)
  const v = await verify(s)
  return v
}

const notAStringE = t =>
  is.error(t) &&
  t.name === 'JsonWebTokenError' &&
  t.message === 'jwt must be a string'

const isMissingE = t =>
  is.error(t) &&
  t.name === 'JsonWebTokenError' &&
  t.message === 'jwt must be provided'

const isMalformedE = t =>
  is.error(t) &&
  t.name === 'JsonWebTokenError' &&
  t.message === 'jwt malformed'

const needSecredE = t =>
  is.error(t) &&
  t.name === 'JsonWebTokenError' &&
  t.message === 'secret or public key must be provided'

const invalidSignatureE = t =>
  is.error(t) &&
  t.name === 'JsonWebTokenError' &&
  t.message === 'invalid signature'

module.exports = [
  { fn: async () => await t({ t: 't' }), expect: is.object },
  { fn: async () => await t({ t: 't' }), expect: t => is.number(t.iat) },
  { fn: async () => await t({ t: 't' }), expect: t => is.string(t.t) },
  { fn: async () => await t({ t: 't' }), expect: t => t.t === 't' },
  { fn: async () => await t({ t: 'test' }), expect: t => t.t === 'test' },
  { fn: async () => await t({ t: 'test' }), expect: t => t.t === 'test' },
  {
    fn: async () => await t({ t: 't' }),
    expect: t => t.exp > new Date().getTime() / 1000,
    info: 'Expires in the future'
  },
  { fn: async () => await verify(), expect: isMissingE },
  { fn: async () => await verify({ t: 't' }), expect: notAStringE },
  { fn: async () => await jwt.verify(await sign('test')), expect: needSecredE },
  { fn: async () => await jwt.verify('test'), expect: isMalformedE },
  { fn: async () => await jwt.verify(await sign('test'), 'sec'), expect: invalidSignatureE },
  // { fn: async () => await jwt.verify('testing'), expect: t => console.log({ t }) },
]
