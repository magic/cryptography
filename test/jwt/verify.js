const { is } = require('@magic/test')

const JWT = require('../../src/jwt')

const jwt = new JWT()

const t = async o => {
  const jwt = new JWT()
  const s = await jwt.sign(o)
  const v = await jwt.verify(s)
  return v
}

const time = () => new Date().getTime() / 1000

module.exports = [
  { fn: t({ t: 't' }), expect: is.object },
  { fn: t({ t: 't' }), expect: t => is.number(t.iat) },
  { fn: t({ t: 't' }), expect: t => is.string(t.t) },
  { fn: t({ t: 'test' }), expect: t => t.t === 'test' },
  { fn: t('test'), expect: t => t.iss === 'Magic Corp.' },
  { fn: t('test'), expect: t => t.aud === 'wizards n witches' },
  { fn: t('test'), expect: t => is.len.gt(t.exp, time() - 1000) },
  { fn: t('test'), expect: t => is.len.gt(t.exp, t.nbf) },
  {
    fn: async () => jwt.verify(await jwt.sign({ iss: 'test' })),
    expect: is.error,
    info: 'invalid issuer returns error',
  },
  {
    fn: async () => jwt.verify(await jwt.sign({ aud: 'test' })),
    expect: is.error,
    info: 'invalid audience returns error',
  },
  { fn: jwt.verify(), expect: false },
  { fn: jwt.verify({ t: 't' }), expect: false },
  { fn: async () => jwt.verify(await jwt.sign('test')), expect: is.object },
]
