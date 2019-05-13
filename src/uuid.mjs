import uuidv4 from 'uuid/v4.js'
import uuidv5 from 'uuid/v5.js'

import is from '@magic/types'
// import log from '@magic/log'

export const { DNS, URL, OID, X500 } = uuidv5

export const namespaces = {
  DNS,
  URL,
  OID,
  X500,
}

export const cleanUUID = id => (is.uuid(id) ? id : uuidv4())

export const addNS = (key, uuid = uuidv4()) => {
  if (!is.string(key)) {
    const msg = `uuid.addNS: expected string as first argument, got: ${key}`
    const err = new Error(msg)
    // log.error(err)
    return err
  }

  if (namespaces[key]) {
    return namespaces[key]
  }

  namespaces[key] = cleanUUID(uuid)

  return namespaces[key]
}

export const addNamespace = addNS

export const v4 = uuidv4
export const v5 = uuidv5
