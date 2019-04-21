## @magic/cryptography
magic cryptography utilities

[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/magic/cryptography.svg)](https://greenkeeper.io/)


**uses magicjs (.mjs) files without compilation. always use latest node version (or at least node >= 10.0.0).**

#### functions:

##### hash


##### jwt
Provides jwts using [jsonwebtoken](https://npmjs.com/package/jsonwebtoken)

##### random
Get random values
```javascript
  import { random } from '@magic/cryptography'

  const randomValues = async () => {
    const num = await random.number({
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
    })

    const nums = await random.numbers(10)
    // get 10 random numbers. clamping not implemented yet.

    const bytes = await random.bytes(33)
    // get 33 random bytes (... a string).
```

##### uuid
Generate v4 and (namespaced) v5 uuids using the [uuid](https://npmjs.com/package/uuid) package
```javascript
  import { uuid } from '@magic/cryptography'

  const v4 = uuid.v4()

  // uuid v5 namespaces
  const { DNS, URL, OID, X500 } = uuid.v5

  const namespaceUuid = uuid.addNS('name')
  const v5 = uuid.v5(namespaceUuid || 'name', DNS)
```

##### word
Get a single random word from the wordlist
```javascript
  import { word } from '@magic/cryptography'

  const generateWord = async () => {
    const randomWord = await word()
    return randomWord
  }
  generateWord()
```


##### words
Get multiple random words from the wordlist
```javascript
  const generateWords = async () => {
    const randomWords = await words(10)
    return randomWords
  }
  generateWords()
```

##### wordlist
List with ~7000 words.


[travis-image]: https://img.shields.io/travis/magic/cryptography/master.svg?label=Linux%20build
[travis-url]: https://travis-ci.org/magic/cryptography
[appveyor-image]: https://img.shields.io/appveyor/ci/jaeh/cryptography/master.svg?label=Windows%20build
[appveyor-url]: https://ci.appveyor.com/project/jaeh/cryptography/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic/cryptography/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/magic/cryptography?branch=master
