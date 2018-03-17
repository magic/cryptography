const v4 = require('uuid/v4')
const v5 = require('uuid/v5')

const { isUUID, isString } = require('types')

const { DNS, URL, OID, X500 } = v5

const namespaces = {
  DNS,
  URL,
  OID,
  X500,
}

const cleanUUID = id => isUUID(id) ? id : v4()

const addNS = (key, uuid = v4()) => {
  if (!isString(key)) {
    console.error('cryptography.uuid.addNS: expected string as first argument, got: {key}')
    return false
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
