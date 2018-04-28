const is = require('@magic/types')
const log = require('@magic/log')

const { v4 } = require('../uuid')
const { bytes } = require('../random')

const { promisify } = require('util')

const jwt = require('jsonwebtoken')

const signToken = promisify(jwt.sign)
const verifyToken = promisify(jwt.verify)

const oneDay = 24 * 60 * 60

let state = {
  payload: {
    exp: Math.floor(new Date().getTime() / 1000 + oneDay),
    nbf: Math.floor(new Date().getTime() / 1000),
    iss: 'Magic Corp.',
    aud: 'wizards n witches',
  },
  options: {
    sign: {
      algorithm: 'HS256',
    },
    verify: {
      algorithm: 'HS256',
    },
  },
}

const signable = t => [is.str, is.num, is.date, is.array].some(f => f(t))

class JWT {
  constructor(args = {}, options = {}) {
    this.payload = { ...state.payload, ...args }
    this.options = {
      sign: { ...state.options.sign, ...options.sign },
      verify: { ...state.options.verify, ...options.verify },
    }

    this.secret = options.secret

    this.sign = this.sign.bind(this)
    this.verify = this.verify.bind(this)
  }

  async sign(args, options = {}) {
    if (!this.secret) {
      this.secret = await bytes()
    }

    if (is.undef(args) || is.null(args)) {
      args = {}
    } else if (signable(args)) {
      args = { payload: args }
    }

    if (!args.jwtid) {
      args.jwtid = await v4()
    }

    const payload = { ...this.payload, ...args }
    options = { ...this.options.sign, ...options }

    try {
      if (new Date().getTime() / 1000 > payload.exp) {
        throw new Error('Expires in the past')
      }

      return await signToken(payload, this.secret, options)
    }
    catch (e) {
      log.error(e)
      return e
    }
  }

  async verify(token, options = {}) {
    if (!token || !is.string(token)) {
      return false
    }

    const { iss: issuer, aud: audience, jwtid } = this.payload
    options = { ...this.options.verify, audience, issuer, jwtid, ...options }

    try {
      return await verifyToken(token, this.secret, options)
    }
    catch (e) {
      log.error(e)
      return e
    }
  }
}

module.exports = JWT
