import test from 'ava'
import { spy } from 'sinon'
import raf from 'raf'
import throttle from './'

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
    t.same(callbackSpy.args[0], args)
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
