import { hash as h } from './hash.mjs'

import compare from './compare.mjs'

export const hash = h

hash.compare = compare
hash.hash = hash

export default hash
