const is = require('@magic/types')

const number = require('./number')
const range = require('../range')

const randomNumbers = async (count = 1, numbers = []) => {
  if (count < 1) {
    count = 1
  }

  if (numbers.length) {
    count -= numbers.length
  }

  numbers = numbers.concat(await Promise.all(range(count).map(number)))

  const noDupes = new Set(numbers)
  if (count !== noDupes.size) {
    numbers = numbers.concat(await randomNumbers(count, numbers))
  }

  return numbers
}

module.exports = randomNumbers
