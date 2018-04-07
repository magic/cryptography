const { isString, isEmpty } = require('@magic/types')

const wordlist = require('../src/wordlist')

const fns = [
  { fn: () => wordlist.length, expect: 7776, info: 'test for wordlist length' },
  { fn: () => wordlist.length, expect: new Set(wordlist).size, info: 'test for uniqueness' },
  { fn: () => wordlist.map(isString).length, expect: 7776, info: 'test if all words are strings' },
  { fn: () => wordlist.filter(isEmpty).length, expect: 0, info: 'test if no word is empty' },
  { fn: () => wordlist.filter(t => t.length < 3).length, expect: 0, info: 'test that all words are longer than 3 chars' },
]

module.exports = fns
