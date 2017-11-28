import { spy } from 'sinon'
import raf from 'raf'
import throttle from './rafThrottle.js'

raf.polyfill();

test('throttle', done => {
  expect.assertions(1)

  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled()

  raf(() => {
    expect(callbackSpy.callCount).toBe(1)
    done()
  })
})

test('call the callback with arguments', done => {
  expect.assertions(1)

  const callbackSpy = spy()
  const args = ['foo', 'bar']

  const throttled = throttle(callbackSpy)
  throttled(...args)

  raf(() => {
    expect(callbackSpy.args[0]).toEqual(args)
    done()
  })
})

test('preserve the context of the first call', done => {
  expect.assertions(1)

  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)

  const c1 = { throttled }
  const c2 = { throttled }

  c1.throttled()
  c2.throttled()

  raf(() => {
    expect(callbackSpy.thisValues[0]).toBe(c1)
    done()
  })
})

test('more throttles', done => {
  expect.assertions(1)

  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled()

  raf(() => {
    throttled()
    throttled()

    raf(() => {
      expect(callbackSpy.callCount).toBe(2)
      done()
    })
  })
})

test(' Cancel the trailing throttled invocation', done => {
  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled.cancel()

  raf(() => {
    expect(callbackSpy.callCount).toBe(0)
    done()
  })
})
