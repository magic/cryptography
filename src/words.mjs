import is from '@magic/types'

import { word } from './word.mjs'

export const words = async (count = 1) => {
  if (!is.number(count)) {
    count = 1
  } else if (count < 1) {
    count = 1
  }

  const words = new Set()

  while (words.size < count) {
    words.add(await word())
  }

  return Array.from(words)
}

export default words
