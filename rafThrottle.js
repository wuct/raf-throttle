const rafThrottle = callback => {
  let requestId

  const later = (context, args) => () => {
    requestId = null
    callback.apply(context, args)
  }

  const throttled = function(...args) {
    if ((requestId === null) || (requestId === undefined)) {
      requestId = requestAnimationFrame(later(this, args))
    }
  }

  throttled.cancel = () =>
    cancelAnimationFrame(requestId)

  return throttled
}

export default rafThrottle
