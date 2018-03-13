const crypto = require('crypto')
const { isNumber } = require('types')


const randomBytes = (byte = 33) => new Promise((resolve, reject) => {
  byte = parseInt(byte, 10)
  if (!isNumber(byte)) {
    reject(new Error(`Invalid number of bytes passed to cryptography.randomBytes. ${byte}`))
  }

  crypto.randomBytes(byte, (err, buf) => {
    if (err) {
      reject(err)
    }

    resolve(buf.toString('hex'))
  })
})

module.exports = randomBytes
