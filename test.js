
const {test} = require('tape')
const asyncCatch = require('.')

test('async fn catch export', (t) => {
  t.is(
    typeof asyncCatch,
    'function',
    'exported value is a function'
  )
  t.end()
})

test('the return of the exported function', (t) => {
  t.is(
    typeof asyncCatch(),
    'function',
    'the return value is a function'
  )
  t.end()
})

test(`
    the returned function should throw if no initial
    function is passed
  `,
  (t) => {
    t.throws(
      () => { typeof asyncCatch()() },
      /apply/,
      'the function throws with the correct error message'
    )
    t.end()
  }
)

test(`
    the returned function should call the first
    function passed to the initial exported function
  `,
  (t) => {
    asyncCatch(() => {
      t.pass('the first function argument is called')
      t.end()
    })()
  }
)

test(`
    the returned function should call the first
    function passed to the initial exported function
    and return the value of that function
  `,
  (t) => {
    t.assert(
      asyncCatch(() => true)(),
      'the value is returned correctly'
    )
    t.end()
  }
)

test(`
    the returned function should call the first
    function passed to the initial exported function
    and if a promise is returned it should add the second
    passed function to the 'catch' method
  `,
  (t) => {
    const fn = () => {}
    asyncCatch(() => ({catch: (handle) => {
      t.is(handle, fn, 'the correct function is passed to the catch method')
      t.end()
    }}), fn)()
  }
)

test(`
    the returned function should call the first
    function passed to the initial exported function
    and if a promise is returned and it's rejected
    the second function argument passed should be called
  `,
  (t) => {
    asyncCatch(
      () => (new Promise((resolve, reject) => reject())),
      () => {
        t.pass('the second function argument is called on rejection')
        t.end()
      }
    )()
  }
)

test(`
    the returned function should call the first
    function passed to the initial exported function
    all the arguments passed to the returned function
    should be passes the the first function argument
  `,
  (t) => {
    asyncCatch((arg1, arg2) => {
      t.assert(arg1, 'the first argument is correct')
      t.is(arg2, 'foo', 'the second argument is correct')
      t.end()
    })(true, 'foo')
  }
)
