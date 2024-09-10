let winDom: Document | null = null
let bodyEl: HTMLElement | null = null

let storeEl: HTMLElement | null = null
let storeId = 'z-index-manage'

let styleEl: HTMLStyleElement | null = null
let styleId = 'z-index-style'

let storeMainKey: 'm' = 'm'
let storeSubKey: 's' = 's'

const storeData = {
  m: 1000,
  s: 1000
}

function getDocument () {
  if (!winDom) {
    if (typeof document !== 'undefined') {
      winDom = document
    } 
  }
  return winDom
}

function getBody () {
  if (winDom && !bodyEl) {
    bodyEl= winDom.body || winDom.getElementsByTagName('body')[0]
  }
  return bodyEl
}

function getDomMaxZIndex () {
  let max = 0
  const dom = getDocument()
  if (dom) {
    const body = getBody()
    if (body) {
      const allElem = body.getElementsByTagName('*')
      for(let i = 0; i < allElem.length; i++) {
        const elem = allElem[i] as HTMLElement
        if (elem && elem.style && elem.nodeType === 1) {
          const zIndex = elem.style.zIndex
          if (zIndex && /^\d+$/.test(zIndex)) {
            max = Math.max(max, Number(zIndex))
          }
        }
      }
    }
  }
  return max
}

function getStyle () {
  if (!styleEl) {
    const dom = getDocument()
    if (dom) {
      styleEl = dom.getElementById(styleId) as HTMLStyleElement
      if (!styleEl) {
        styleEl = dom.createElement('style')
        styleEl.id = styleId
        dom.getElementsByTagName('head')[0].appendChild(styleEl)
      }
    }
  }
  return styleEl
}

function updateVar () {
  let styEl = getStyle()
  if (styEl) {
    let prefixes = '--dom-'
    let propKey = '-z-index'
    styEl.innerHTML = ':root{' + prefixes + 'main' + propKey + ':' + getCurrent() + ';' + prefixes + 'sub' + propKey + ':' + getSubCurrent() + '}'
  }
}

function getStoreDom () {
  if (!storeEl) {
    const dom = getDocument()
    if (dom) {
      storeEl = dom.getElementById(storeId)
      if (!storeEl) {
        const body = getBody()
        if (body) {
          storeEl = dom.createElement('div')
          storeEl.id = storeId
          storeEl.style.display = 'none'
          body.appendChild(storeEl)
          setCurrent(storeData.m)
          setSubCurrent(storeData.s)
        }
      }
    }
  }
  return storeEl
}

function createSetHandle (key: keyof (typeof storeData)) {
  return function (value: number) {
    if (value) {
      value = Number(value)
      storeData[key] = value
      let el = getStoreDom()
      if (el) {
        if (el.dataset) {
          el.dataset[key] = value + ''
        } else {
          el.setAttribute('data-' + key, value + '')
        }
      }
    }
    updateVar()
    return storeData[key]
  }
}

export const setCurrent = createSetHandle(storeMainKey)

function createGetHandle (key: keyof (typeof storeData), nextMethod: () => number) {
  return function getCurrent (currZindex?: number) {
    let zIndex
    let el = getStoreDom()
    if (el) {
      const domVal = el.dataset ? el.dataset[key] : el.getAttribute('data-' + key)
      if (domVal) {
        zIndex = Number(domVal)
      }
    }
    if (!zIndex) {
      zIndex = storeData[key]
    }
    if (currZindex) {
      if (Number(currZindex) < zIndex) {
        return nextMethod()
      }
      return currZindex
    }
    return zIndex
  }
}

export const getCurrent = createGetHandle(storeMainKey, getNext)

export function getNext () {
  return setCurrent(getCurrent() + 1)
}

export const setSubCurrent = createSetHandle(storeSubKey)

const _getSubCurrent = createGetHandle(storeSubKey, getSubNext)

export function getSubCurrent () {
  return getCurrent() + _getSubCurrent()
}

export function getSubNext () {
  setSubCurrent(_getSubCurrent() + 1)
  return getSubCurrent()
}

/**
 * Web common z-index style management
 */
const DomZIndex = {
  setCurrent,
  getCurrent,
  getNext,
  setSubCurrent,
  getSubCurrent,
  getSubNext,
  getMax: getDomMaxZIndex
}

updateVar()

export default DomZIndex
