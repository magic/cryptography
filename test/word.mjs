import is from '@magic/types'
import word from '../src/word.mjs'

const runs = process.env.RUNS || 1

export default [{ fn: async () => word(), runs, expect: is.string }]
