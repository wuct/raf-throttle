const rafThrottle = callback => {
  let requestId
  let context

  const later = args => () => {
    requestId = null
    callback.apply(context, args)
    context = null
  }

  const throttled = function(...args) {
    if ((requestId === null) || (requestId === undefined)) {
      requestId = requestAnimationFrame(later(args))
    }
    context = this
  }

  throttled.cancel = () =>
    cancelAnimationFrame(requestId)

  return throttled
}

export default rafThrottle
