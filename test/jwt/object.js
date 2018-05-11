const { is } = require('@magic/test')

const JWT = require('../../src/jwt')

const jwt = new JWT()

const exp = Math.floor(new Date().getTime() / 1000 + 1000)

module.exports = [
  { fn: jwt.object({ t: 't' }), expect: is.object },
  { fn: jwt.object({ t: 't' }), expect: t => Object.keys(t).indexOf('t') > -1 },
  { fn: jwt.object({ t: 't' }), expect: t => t.t === 't' },
  { fn: jwt.object({ t: 't', jid: 'testing' }), expect: t => t.jid === 'testing' },
]
