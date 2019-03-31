import raf from 'raf'
import throttle from './rafThrottle.js'

raf.polyfill();

test('throttle', done => {
  expect.assertions(1)

  const callbackSpy = jest.fn()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled()

  raf(() => {
    expect(callbackSpy.mock.calls.length).toBe(1)
    done()
  })
})

test('call the callback with arguments', done => {
  expect.assertions(1)

  const callbackSpy = jest.fn()
  const args = ['foo', 'bar']

  const throttled = throttle(callbackSpy)
  throttled(...args)

  raf(() => {
    expect(callbackSpy.mock.calls[0]).toEqual(args)
    done()
  })
})

test('preserve the context of the first call', done => {
  expect.assertions(1)

  const callbackSpy = jest.fn()

  const throttled = throttle(callbackSpy)

  const c1 = { throttled }
  const c2 = { throttled }

  c1.throttled()
  c2.throttled()

  raf(() => {
    expect(callbackSpy.mock.instances[0]).toBe(c1)
    done()
  })
})

test('invokes the callback with the most recent args', done => {
  expect.assertions(1)

  const callbackSpy = jest.fn()

  const throttled = throttle(callbackSpy)

  throttled(1)
  throttled(2)

  raf(() => {
    expect(callbackSpy).lastCalledWith(2);
    done()
  })
})

test('more throttles', done => {
  expect.assertions(1)

  const callbackSpy = jest.fn()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled()

  raf(() => {
    throttled()
    throttled()

    raf(() => {
      expect(callbackSpy.mock.calls.length).toBe(2)
      done()
    })
  })
})

test('cancel the trailing throttled invocation', done => {
  expect.assertions(1)

  const callbackSpy = jest.fn()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled.cancel()

  raf(() => {
    expect(callbackSpy.mock.calls.length).toBe(0)
    done()
  })
})

test('resume normal operation after canceling the trailing throttled invocation', done => {
  expect.assertions(1)

  const callbackSpy = jest.fn()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled.cancel()
  throttled()

  raf(() => {
    expect(callbackSpy.mock.calls.length).toBe(1)
    done()
  })
})
