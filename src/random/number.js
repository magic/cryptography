const crypto = require('crypto')

const defaultArgs = {
  min: 0,
  max: 281474976710654,
}

const randomNumber = async params => {
  try {
    const options = Object.assign({}, defaultArgs, params)
    let { min, max } = options

    const distance = max - min

    if (min > max) {
      const m = min
      min = max
      max = m
    }

    if (max > Number.MAX_SAFE_INTEGER) {
      throw new Error('max number should be safe integer limit')
    }

    if (distance > 281474976710655) {
      throw new Error('Range is greater than 256^6-1')
    }

    let subOnEnd = 0
    if (min < 0) {
      subOnEnd = min
      max += Math.abs(min)
      min = 0
    }

    let maxBytes = 6
    let maxDec = 281474976710656

    // Adjust maxBytes for small ranges
    if (distance < 256) {
      maxBytes = 1
      maxDec = 256
    } else if (distance < 65536) {
      maxBytes = 2
      maxDec = 65536
    } else if (distance < 16777216) {
      maxBytes = 3
      maxDec = 16777216
    } else if (distance < 4294967296) {
      maxBytes = 4
      maxDec = 4294967296
    } else if (distance < 1099511627776) {
      maxBytes = 4
      maxDec = 1099511627776
    }

    const byteString = await crypto.randomBytes(maxBytes).toString('hex')
    const randbytes = parseInt(byteString, 16)

    return Math.min(
      max,
      Math.floor(randbytes / maxDec * (max - min + 1) + min + subOnEnd),
    )
  } catch (e) {
    console.error(e)
    return false
  }
}

module.exports = randomNumber
