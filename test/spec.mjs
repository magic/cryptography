import { is } from '@magic/test'

import * as c from '../src/index.mjs'

export default [
  { fn: () => c.hash, expect: is.function },
  { fn: () => c.hash.hash, expect: is.function },
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
]
