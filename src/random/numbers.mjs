import is from '@magic/types'

import number from './number.mjs'

export const numbers = async (count = 1) => {
  if (!is.number(count) || count < 1) {
    count = 1
  }

  const nums = new Set()

  while (nums.size < count) {
    nums.add(await number())
  }

  return Array.from(nums)
}

export default numbers
