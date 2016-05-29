import raf from 'raf'

const rafThrottle = callback => {
  let requestId

  const later = args => () => {
    requestId = null
    callback(...args)
  }

  const throttled = (...args) => {
    if (requestId == null) {
      requestId = raf(later(args))
    }
  }

  throttled.cancel = () =>
    raf.cancel(requestId)

  return throttled
}

export default rafThrottle
