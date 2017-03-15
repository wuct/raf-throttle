# raf-throttle

> Throttle a function by requestAnimationFrame

[![npm](https://img.shields.io/npm/v/raf-throttle.svg)](https://www.npmjs.com/package/raf-throttle)
[![Travis](https://img.shields.io/travis/wuct/raf-throttle.svg)](https://travis-ci.org/wuct/raf-throttle)
[![Codecov](https://img.shields.io/codecov/c/github/wuct/raf-throttle.svg)](https://codecov.io/github/wuct/raf-throttle)
[![Code Climate](https://img.shields.io/codeclimate/github/wuct/raf-throttle.svg)](https://codeclimate.com/github/wuct/raf-throttle)

[raf-throttle](https://www.npmjs.com/package/raf-throttle) let you create a throttled function, which only invokes the passed function at most once per [animation frame](https://developer.mozilla.org/en/docs/Web/API/window/requestAnimationFrame) on a browser or per 1000/60 ms on Node.

## [Demo](https://jsfiddle.net/mxbnpwp0/)

## Installation

### npm

`npm install raf-throttle --save`

### yarn

`yarn add raf-throttle`

### CDN

Download the file from [https://unpkg.com/raf-throttle/umd/rafThrottle.min.js](),

and consume it from global as `rafThrottle`.

## Usage

### Polyfill

Since [most of browsers](http://caniuse.com/#feat=requestanimationframe) support `requestAnimationFrame` by default, you can use `raf-throttle` directly. However, if you want to support old browsers, you will need to polyfill `requestAnimationFrame` by youself. One option is using [`raf`](https://www.npmjs.com/package/raf).

### Example

Avoid excessively updating the position while scrolling.

#### JS

```js
import throttle from 'raf-throttle'

const throttled = throttle(updatePosition)
window.addEventListener('scroll', throttled)
```

#### jQuery

```js
import throttle from 'raf-throttle'

$(window).on('scroll', throttle(updatePosition))
```

#### React

```js
import React from 'react'
import throttle from 'raf-throttle'

class extends React.Component {
  onScroll = throttle(updatePosition)

  componentDidMount = () =>
    window.addEventListener('scroll', this.onScroll)

  componentWillUnmount = () =>
    window.removeEventListener('scroll', this.onScroll)

  render = () =>
    /* Your code */
}
```

If you think the React code is verbose and you want to move them into a higher-order component, you shoul take a look at [`react-dom-utils`](https://github.com/wuct/react-dom-utils), which has done this for you.

### Canceling

Cancel the trailing throttled invocation.

```js
const throttled = throttle(foo)
throttled()
throttled.cancel() // foo would never be invoked
```

## API

```js
import throttle from 'raf-throttle'
```

#### `const throttled = throttle(callback)`

`callback` is the function to be throttled by [`requestAnimationFrame`](https://developer.mozilla.org/en/docs/Web/API/window/requestAnimationFrame).

#### `throttled.cancel()`

Cancel the trailing throttled invocation.

## Contributing

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)
