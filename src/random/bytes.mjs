import crypto from 'crypto'
import is from '@magic/types'

const byteDefault = 33

export const bytes = byte =>
  new Promise((resolve, reject) => {
    byte = parseInt(byte, 10)

    if (!is.number(byte)) {
      byte = byteDefault
    }

    crypto.randomBytes(byte, (err, buf) => {
      if (err) {
        reject(err)
        return
      }

      resolve(buf.toString('hex'))
    })
  })

export default bytes
