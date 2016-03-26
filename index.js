import raf from 'raf'

const rafThrottle = callback => {
  let requestId

  const later = args => () => {
    requestId = null
    callback(...args)
  }

  return (...args) => {
    if (requestId == null) {
      requestId = raf(later(args))
    }
  }
}

export default rafThrottle
