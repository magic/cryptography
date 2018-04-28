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
  { fn: async () => t({ t: 't' }), expect: is.object },
  { fn: async () => t({ t: 't' }), expect: t => is.number(t.iat) },
  { fn: async () => t({ t: 't' }), expect: t => is.string(t.t) },
  { fn: async () => t({ t: 'test' }), expect: t => t.t === 'test' },
  { fn: async () => t('test'), expect: t => t.iss === 'Magic Corp.' },
  { fn: async () => t('test'), expect: t => t.aud === 'wizards n witches' },
  { fn: async () => t('test'), expect: t => is.len.gt(t.exp, time() - 1000)  },
  { fn: async () => t('test'), expect: t => is.len.gt(t.exp, t.nbf)  },
  { fn: async () => jwt.verify(await jwt.sign({ iss: 'test' })), expect: is.error, info: 'invalid issuer returns error' },
  { fn: async () => jwt.verify(await jwt.sign({ aud: 'test' })), expect: is.error, info: 'invalid audience returns error' },
  { fn: async () => jwt.verify(), expect: false },
  { fn: async () => jwt.verify({ t: 't' }), expect: false },
  { fn: async () => jwt.verify(await jwt.sign('test')), expect: is.object },
]
