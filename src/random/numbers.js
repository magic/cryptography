const is = require('@magic/types')

const number = require('./number')
const range = require('../range')

const randomNumbers = async (count = 1) => {
  if (!is.number(count) || count < 1) {
    count = 1
  }

  const numbers = new Set()

  while (numbers.size < count) {
    numbers.add(await number())
  }

  return Array.from(numbers)
}

module.exports = randomNumbers
