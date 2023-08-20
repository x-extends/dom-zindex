# z-index 管理器

[English](README.md) | 简体中文  

[![npm version](https://img.shields.io/npm/v/dom-zindex.svg?style=flat-square)](https://www.npmjs.com/package/dom-zindex)
[![npm downloads](https://img.shields.io/npm/dt/dom-zindex.svg?style=flat-square)](https://npm-stat.com/charts.html?package=dom-zindex)
[![issues](https://img.shields.io/github/issues/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

Web 通用的 z-index style 管理器  

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
7+ ✔ | 80+ ✔ | 44+ ✔ | 40+ ✔ | 60+ ✔ | 6+ ✔ |

## 安装

```shell
npm install dom-zindex
```

### CDN

```HTML
<script src="https://unpkg.com/dom-zindex"></script>
```

## Example

```javascript
import domZindex from 'dom-zindex'

// 获取当前 z-index
domZindex.getCurrent() // 1000

// 获取下一级 z-index
domZindex.getNext() // 1001

// 获取次要的当前 z-index，次要的 z-index 始终会大于主要的 z-index
domZindex.getSubCurrent() // 2001

// 获取次要的下一级 z-index
domZindex.getSubNext() // 2002
```

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
