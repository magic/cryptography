const { isUUID } = require('types')

const { uuid } = require('../src')

const { DNS } = uuid.v5

const runs = process.env.TESTRUNS || 10

const fns = {
  v4: [
    { fn: () => uuid.v4(), runs, expect: t => t !== uuid.v4() },
    { fn: () => uuid.v4(), runs, expect: isUUID },
  ],
  v5: [
    { fn: () => uuid.v5('test', DNS), expect: isUUID },
  ],
  addNamespace: [
    { fn: () => uuid.addNS('test'), expect: isUUID },
    { fn: () => uuid.addNS('test'), expect: isUUID },
    { fn: () => uuid.addNS('t', 't920tj22t32-tj2f2f223f23'), expect: t => t !== 't920tj22t32-tj2f2f223f23' },
    { fn: () => uuid.addNS(), expect: false },
  ],
}

module.exports = fns
