const crypto = require('crypto')

const defaultArgs = {
	min: 0,
	max: 281474976710654,
	throwing: true,
}

const randomNumber = (params) => {
	const options = Object.assign({}, defaultArgs, params)
	const { min, max, throwing } = options

	const distance = max - min

	let error = false
	if (min >= max) {
		error = new Error('min number should be less than max')
  }
  else if (distance > 281474976710655) {
    error = new Error('You can not get all possible random numbers if range is greater than 256^6-1')
  }
  else if (max > Number.MAX_SAFE_INTEGER) {
    error = new Error('max number should be safe integer limit');
	}
	else if (min < 0) {
		error = new Error('min can not be lower than 0')
	}

	if (error) {
		if (throwing) {
			throw error
		}
		return error
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

  const byteString = crypto.randomBytes(maxBytes).toString('hex')
  const randbytes = parseInt(byteString, 16)

	const result = Math.floor(randbytes / maxDec * (max - min + 1) + min)

	if (result > max) {
		result = max
  }

	return result
}

module.exports = randomNumber
