import { is } from '@magic/test'

import range from '../src/range.mjs'

export default [
  { fn: () => range(0, 10), expect: is.array },
  { fn: () => range(0, 9), expect: is.len.eq(10) },
  { fn: () => range(10, 0), expect: t => t[0] > t[1] },
  { fn: () => range(10), expect: t => t[0] > t[1] },
  { fn: () => range(10), expect: is.len.eq(10) },
]
