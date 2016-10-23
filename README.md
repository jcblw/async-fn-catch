## Async Fn Catch

Async function error handling can be tricky. As the author of a plugin I don't want to create nearly impossible errors to catch. I like them to be exposed to the user in a simple interface.

This is a solution I have found to be useful.

### Install

```shell
npm install async-fn-catch --save
# or
yarn add async-fn-catch
```

## Usage

```javascript
// import function
const asyncCatch = require('async-fn-catch')
// or
import asyncCatch from 'async-fn-catch'
```

This first example shows how you wrap a function with `async-fn-catch` to make the error super easy to catch. You could do the same by adding a `.catch` to the `foo()` call. Which is essentially what this lib is doing.

```javascript
const errorHandler = err => console.log(err) // just log error

const foo = asyncCatch(
  async function fooAsync () {
    await bar() // error happens in here
  },
  errorHandler
)

async function bar () {
  ... // do complex stuff
  throw new Error('qux')
}

foo() // logs -> Error "qux"
```

This next example shows how error handling with async can get a bit trickier when dealing with methods in a class.

```javascript
class Foo extends EventEmitter {
  constructor () {
    super()
    this.bar = asyncCatch(
      this.bar.bind(this),
      this.onError.bind(this)
    )
  }
  onError (err) { this.emit('error', err)}
  async bar () { await this.baz() }
  async baz () { throw new Error('qux') }
}

const foo = new Foo()
foo.on('error', (err) => console.log(err))
foo.bar() // logs -> Error "qux"
```
