const hash = require('./hash')

hash.salt = require('./salt')
hash.compare = require('./compare')
hash.hash = hash

module.exports = hash
