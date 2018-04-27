const range = require('./range')
const word = require('./word')

const words = async (count = 10) => Promise.all(range(count).map(word))

module.exports = words
