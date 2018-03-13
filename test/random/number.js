const { isNumber } = require('types')

const { randomNumber } = require('../../src')

const runs = process.env.RUNS || 100
const max = 281474976710654

const numbers = []

const fns = [
  { fn: () => randomNumber({ max: 1 }), runs, expect: t => t >= 0 },
  // numbers stay in chosen bounds
  { fn: () => randomNumber({ min: 0, max: 1 }), runs, expect: t => t >= 0 && t <= 1 },
  { fn: () => randomNumber({ min: 4, max: 17 }), runs, expect: t => t >= 4 && t <= 17 },
  { fn: () => randomNumber({ min: 23, max: 32 }), runs, expect: t => t >= 23 && t <= 32 },
  { fn: () => randomNumber({ min: 4444441, max: 4444443 }), runs, expect: t => t >= 4444441 && t <= 4444443 },
  // numbers will not equal each other
  { fn: () => randomNumber(), runs, expect: t1 => t1 !== randomNumber() },
  // are all return values numbers?
  { fn: () => randomNumber(), runs, expect: isNumber },
  // no duplicates in array of RUNS numbers
  { fn: () => { numbers.push(randomNumber()); return numbers }, runs, expect: t => t.length === new Set(t).size }
]

module.exports = fns
