const crypto = require('crypto')

const randomBytes = () => new Promise((resolve, reject) => {
  crypto.randomBytes(33, (err, buf) => {
    if (err) {
      reject(err)
    }

    resolve(buf.toString('hex'))
  })
})

module.exports = randomBytes
