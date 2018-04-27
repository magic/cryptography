const jwt = require('../../src/jwt')

const sign = async v => await jwt.sign(v, 'secret')
const verify = async v => await jwt.verify(v, 'secret')

const t = async () => {
  const s = await sign({t: 't'})
  console.log(['t'], s)
  const v = await verify(s)
  console.log({ s, v })
}

// t()

module.exports = [
  // {
  //   fn: async () => await verify(await sign('testing')),
  //   expect: async t => console.log({ t }),
  // },
]
