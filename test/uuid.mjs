import { is, tryCatch } from '@magic/test'

import { uuid } from '../src/index.mjs'

const { DNS } = uuid.v5

const runs = process.env.TESTRUNS || 1

export default {
  v4: [
    { fn: () => uuid.v4(), runs, expect: t => t !== uuid.v4() },
    { fn: () => uuid.v4(), runs, expect: is.uuid },
  ],
  v5: [{ fn: () => uuid.v5('test', DNS), expect: is.uuid }],
  addNamespace: [
    {
      fn: () => uuid.addNS('test'),
      expect: t => is.uuid(uuid.namespaces.test),
    },
    { fn: () => uuid.addNS('test'), expect: t => t === uuid.namespaces.test },
    { fn: () => uuid.addNS('t', 't920tj22t32-tj2f2f223f23'), expect: is.uuid },
    {
      fn: () => uuid.addNS('t', 't920tj22t32-tj2f2f223f23'),
      expect: t => t !== 't920tj22t32-tj2f2f223f23',
    },
    { fn: tryCatch(uuid.addNS), expect: is.error },
  ],
  cleanUUID: [
    { fn: () => uuid.cleanUUID('test'), expect: is.uuid },
    { fn: () => uuid.cleanUUID(''), expect: is.uuid },
    { fn: () => uuid.cleanUUID(123456789), expect: is.uuid },
  ],
}
