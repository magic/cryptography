const crypto = require('crypto')
const is = require('@magic/types')

const byteDefault = 33

const randomBytes = byte =>
  new Promise((resolve, reject) => {
    byte = parseInt(byte, 10)
    if (!is.number(byte)) {
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
