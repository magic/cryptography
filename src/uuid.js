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

const addNS = (key, uuid) => {
  if (!isString(key)) {
    console.error('cryptography.uuid.addNS: expected string as first argument, got: {key}')
    return false
  }

  if (namespaces[key]) {
    return namespaces[key]
  }

  if (!isUUID(uuid)) {
    uuid = v4()
  }

  namespaces[key] = uuid
  return uuid
}

module.exports = {
  v4,
  v5,
  namespaces,
  addNS,
  addNamespace: addNS,
}
