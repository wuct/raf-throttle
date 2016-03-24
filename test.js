import test from 'ava'
import raf from 'raf'
import throttle from './'

test.cb('throttle', t => {
  t.plan(1)

  let counter = 0
  const throttledIncrease = throttle(() => counter++)
  throttledIncrease()
  throttledIncrease()

  setTimeout(() => {
    t.is(counter, 1)
    t.end()
  }, 60)
})
