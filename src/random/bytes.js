const crypto = require('crypto')
const { isNumber } = require('@magic/types')

const byteDefault = 33

const randomBytes = byte =>
  new Promise((resolve, reject) => {
    byte = parseInt(byte, 10)
    if (!isNumber(byte)) {
      console.error(
        `cryptography.randomBytes(bytes): bytes must be a number. ${byte}. using default instead: ${byteDefault}`,
      )
      byte = byteDefault
    }

    crypto.randomBytes(byte, (err, buf) => {
      /* istanbul ignore if */
      if (err) {
        reject(err)
      }

      resolve(buf.toString('hex'))
    })
  })

module.exports = randomBytes
