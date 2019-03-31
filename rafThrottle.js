const rafThrottle = callback => {
  let requestId = null

  const later = (context, args) => () => {
    requestId = null
    callback.apply(context, args)
  }

  const throttled = function(...args) {
    if (requestId === null) {
      requestId = requestAnimationFrame(later(this, args))
    }
  }

  throttled.cancel = () => {
    cancelAnimationFrame(requestId)
    requestId = null
  }

  return throttled
}

export default rafThrottle
