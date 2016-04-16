# raf-throttle

> Throttle a function by requestAnimationFrame

[![npm](https://img.shields.io/npm/v/raf-throttle.svg)](https://www.npmjs.com/package/raf-throttle)
[![Travis](https://img.shields.io/travis/wuct/raf-throttle.svg)](https://travis-ci.org/wuct/raf-throttle)
[![Coveralls](https://img.shields.io/coveralls/wuct/raf-throttle.svg)](https://coveralls.io/github/wuct/raf-throttle)
[![Code Climate](https://img.shields.io/codeclimate/github/wuct/raf-throttle.svg)](https://codeclimate.com/github/wuct/raf-throttle)

[raf-throttle](https://www.npmjs.com/package/raf-throttle) let you create a throttled function, which only invokes the passed function at most once per animation frame on a browser or per 1000/60 ms on Node.

## Installation

`npm install raf-throttle --save`

## Usage

### Example

```js
import throttle from 'raf-throttle'

const throttled = throttle(updatePosition)
window.addEventListener('scroll', throttled)
```

## Contributing

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

