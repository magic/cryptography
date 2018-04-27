const { is } = require('@magic/test')

const c = require('../src')
const hash = require('../src/hash')
const words = require('../src/words')
const wordlist = require('../src/wordlist')
const uuid = require('../src/uuid')
const { v4, v5 } = require('../src/uuid')
const random = require('../src/random')

const randomBytes = require('../src/random/bytes')
const randomNumber = require('../src/random/bytes')
const randomNumbers = require('../src/random/bytes')

module.exports = [
  { fn: () => c.hash, expect: is.function },
  { fn: () => c.hash.hash, expect: is.function },
  { fn: () => c.hash.salt, expect: is.function },
  { fn: () => c.hash, expect: is.deep.equal(c.hash.hash) },
  { fn: () => c.uuid, expect: is.object },
  { fn: () => c.uuid.v4, expect: is.function },
  { fn: () => c.uuid.v5, expect: is.function },
  { fn: () => c.random, expect: is.object },
  { fn: () => c.random.bytes, expect: is.function },
  { fn: () => c.random.number, expect: is.function },
  { fn: () => c.random.numbers, expect: is.function },
  { fn: () => c.words, expect: is.function },
  { fn: () => c.wordlist, expect: is.array },
  { fn: () => c.wordlist, expect: is.deep.equal(wordlist) },
]
