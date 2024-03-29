import { is } from '@magic/test'

import JWT from '../../src/jwt/index.mjs'

const payload = {
  exp: '24h',
  iss: 'Magic Corp.',
  aud: 'wizards n witches',
}

const options = {
  sign: {
    algorithm: 'HS256',
  },
  verify: {
    algorithm: 'HS256',
  },
}

const time = () => parseInt(Math.floor(new Date().getTime() / 1000))

export default [
  { fn: new JWT(), expect: is.object },
  { fn: new JWT(), expect: t => is.object(t.payload) },
  { fn: new JWT(), expect: t => is.object(t.options) },
  { fn: new JWT(), expect: t => is.deep.equal(t.options, options) },
  { fn: new JWT(), expect: t => t.payload.iss === payload.iss },
  { fn: new JWT(), expect: t => t.payload.aud === payload.aud },
  { fn: new JWT(), expect: t => is.len.gt(t.payload.exp, time()) },
  { fn: new JWT(), expect: t => is.len.lte(t.payload.nbf, time()) },
  { fn: new JWT(), expect: t => is.len.gt(t.payload.exp, t.payload.nbf) },
  { fn: new JWT({ iss: 'ISSUER' }), expect: t => t.payload.iss === 'ISSUER' },
  { fn: new JWT({ aud: 'AUD' }), expect: t => t.payload.aud === 'AUD' },
  { fn: new JWT({ exp: '1h' }), expect: t => t.payload.exp === '1h' },
]
