type Throttled<T> = T & { cancel: () => void }

export default function rafThrottle<T extends (...args: any[]) => any>(
  callback: T
): Throttled<T>
