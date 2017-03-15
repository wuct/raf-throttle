import test from 'ava'
import { spy } from 'sinon'
import raf from 'raf'
import throttle from './rafThrottle.js'

raf.polyfill();

test.cb('throttle', t => {
  t.plan(1)

  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled()

  raf(() => {
    t.is(callbackSpy.callCount, 1)
    t.end()
  })
})

test.cb('call the callback with arguments', t => {
  t.plan(1)

  const callbackSpy = spy()
  const args = ['foo', 'bar']

  const throttled = throttle(callbackSpy)
  throttled(...args)

  raf(() => {
    t.deepEqual(callbackSpy.args[0], args)
    t.end()
  })
})

test.cb('more throttles', t => {
  t.plan(1)

  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled()

  raf(() => {
    throttled()
    throttled()

    raf(() => {
      t.is(callbackSpy.callCount, 2)
      t.end()
    })
  })
})

test.cb(' Cancel the trailing throttled invocation', t => {
  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled.cancel()

  raf(() => {
    t.is(callbackSpy.callCount, 0)
    t.end()
  })
})
