import { is } from '@magic/test'

import JWT from '../../src/jwt/index.mjs'

const jwt = new JWT()

const exp = Math.floor(new Date().getTime() / 1000 + 1000)

export default [
  { fn: jwt.object({ t: 't' }), expect: is.object },
  { fn: jwt.object({ t: 't' }), expect: t => Object.keys(t).indexOf('t') > -1 },
  { fn: jwt.object({ t: 't' }), expect: t => t.t === 't' },
  { fn: jwt.object({ t: 't', jid: 'testing' }), expect: t => t.jid === 'testing' },
]
