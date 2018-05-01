const is = require('@magic/types')

const range = require('./range')
const word = require('./word')

const randomWords = async (count = 1) => {
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

module.exports = randomWords
