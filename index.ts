let storeEl: HTMLElement | null = null
let storeId = 'z-index-manage'
let storeMainKey: 'm' = 'm'
let storeSubKey: 's' = 's'

const storeData = {
  m: 1000,
  s: 1000
}

function getDom () {
  if (!storeEl) {
    if (typeof document !== 'undefined') {
      storeEl = document.getElementById(storeId)
      if (!storeEl) {
        storeEl = document.createElement('div')
        storeEl.id = storeId
        storeEl.style.display = 'none'
        document.body.appendChild(storeEl)
        setCurrent(storeData.m)
        setSubCurrent(storeData.s)
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
      let doc = getDom()
      if (doc) {
        if (doc.dataset) {
          doc.dataset[key] = value + ''
        } else {
          doc.setAttribute('data-' + key, value + '')
        }
      }
    }
    return storeData[key]
  }
}

export const setCurrent = createSetHandle(storeMainKey)

function createGetHandle (key: keyof (typeof storeData), nextMethod: () => number) {
  return function getCurrent (currZindex?: number) {
    let zIndex
    let doc = getDom()
    if (doc) {
      const domVal = doc.dataset ? doc.dataset[key] : doc.getAttribute('data-' + key)
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
  getSubNext
}

export default DomZIndex
