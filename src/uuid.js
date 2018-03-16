const uuidv4 = require('uuid/v4')

const namespaces = {
  default: '6ca7b814-9dad-11d1-80b4-00c04fd430c8',
}

const addNS = (key, uuid) => namespaces[key] = uuid

module.exports = {
  uuidv4,
  uuidv5,
  namespaces,
}
