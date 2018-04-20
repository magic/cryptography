const v4 = require('uuid/v4')
const v5 = require('uuid/v5')

const is = require('@magic/types')
const log = require('@magic/log')

const { DNS, URL, OID, X500 } = v5

const namespaces = {
  DNS,
  URL,
  OID,
  X500,
}

const cleanUUID = id => (is.uuid(id) ? id : v4())

const addNS = (key, uuid = v4()) => {
  if (!is.string(key)) {
    const msg = `uuid.addNS: expected string as first argument, got: ${key}`
    const err = new Error(msg)
    log.error(err)
    return err
  }

  if (namespaces[key]) {
    return namespaces[key]
  }

  namespaces[key] = cleanUUID(uuid)

  return namespaces[key]
}

module.exports = {
  v4,
  v5,
  namespaces,
  addNS,
  addNamespace: addNS,
  cleanUUID,
}
