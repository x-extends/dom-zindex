# z-index Manager

English | [简体中文](README.zh-CN.md)  

[![npm version](https://img.shields.io/npm/v/dom-zindex.svg?style=flat-square)](https://www.npmjs.com/package/dom-zindex)
[![npm downloads](https://img.shields.io/npm/dt/dom-zindex.svg?style=flat-square)](https://npm-stat.com/charts.html?package=dom-zindex)
[![issues](https://img.shields.io/github/issues/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

Web common z-index style management.

## Browser Support

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Installing

```shell
npm install dom-zindex
```

## Example

```javascript
import domZindex from 'dom-zindex'

// Get main current z-index
domZindex.getCurrent() // 1000

// Get main next z-index
domZindex.getNext() // 1001

// Get subordinate current z-index, the secondary z-index will always be greater than the primary z-index.
domZindex.getSubCurrent() // 2001

// Get subordinate next z-index
domZindex.getSubNext() // 2002
```

## CDN

```HTML
<script src="https://unpkg.com/dom-zindex"></script>
```

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
