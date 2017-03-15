const rafThrottle = callback => {
  let requestId

  const later = args => () => {
    requestId = null
    callback(...args)
  }

  const throttled = (...args) => {
    if (requestId == null) {
      requestId = requestAnimationFrame(later(args))
    }
  }

  throttled.cancel = () =>
    cancelAnimationFrame(requestId)

  return throttled
}

export default rafThrottle
