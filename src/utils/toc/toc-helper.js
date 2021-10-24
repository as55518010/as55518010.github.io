import './toc-helper.min.css'

const doc = document
const win = window
const body = doc.body
const $ = doc.querySelector.bind(doc)
const $$ = doc.querySelectorAll.bind(doc)
const isMobile = (/Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent))
const enterEvent = isMobile ? 'touchstart' : 'mouseenter'
const leaveEvent = isMobile ? 'touchend' : 'mouseleave'
const clickEvent = isMobile ? 'touchend' : 'click'
const resize = isMobile ? 'orientationchange' : 'resize'
const scrollEvent = 'scroll'

const scrollDir = {
  V: 'vertical', // 豎
  H: 'horizontal' // 水平
}
const isHTMLElement = function(el) {
  return el instanceof HTMLElement
}
const isString = function(o) {
  return typeof o === 'string'
}
const isObject = function(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}
const getDom = (selector) => {
  try {
    return $(selector)
  } catch (error) {
    return null
  }
}
const css = function(el, key, value) {
  if (el && !value) {
    return win.getComputedStyle(el).getPropertyValue(key)
  }
  el.style[key] = value
}
const isPosition = function(el) {
  const position = css(el, 'position')
  return position && position !== 'static'
}
const hasScrollbar = function(el, dir = scrollDir.V) { // horizontal 水平
  return dir === scrollDir.V ? el.scrollHeight > el.clientHeight : (dir === scrollDir.H ? el.scrollWidth > el.clientWidth : false)
}

// 窗口可視高度
let viewHeight = doc.documentElement.clientHeight

const CLASS_NAMES = {
  TOC: 'toc'
}
const SELECTORS = {
  DATA_TOC: '*[data-toc]'
}
const defaultOptions = {
  dom: SELECTORS.DATA_TOC,
  classNames: {
    toc: CLASS_NAMES.TOC,
    fxied: `${CLASS_NAMES.TOC}-fixed`,
    brand: `${CLASS_NAMES.TOC}-brand`,
    navbar: `${CLASS_NAMES.TOC}-navbar`,
    hightlight: `${CLASS_NAMES.TOC}-hightlight`,
    nav: `${CLASS_NAMES.TOC}-nav`,
    link: `${CLASS_NAMES.TOC}-link`,
    active: 'active',
    marginLeft1: 'ml-1',
    marginLeft2: 'ml-2',
    marginLeft3: 'ml-3',
    marginLeft4: 'ml-4',
    marginLeft5: 'ml-5',
    marginLeft6: 'ml-6'
  },
  hightlight: true,
  brand: '目錄',
  shadow: 'shadow',
  idPrefix: 'toc-heading-',
  offsetBody: body,
  tocFixed: {
    top: 24,
    left: 0
  },
  maxDepth: 6,
  autoScroll: true // 自動添加滾動條
}

const TocHelper = function(selector, options = defaultOptions) {
  if (isString(selector) || isHTMLElement(selector)) {
    options.dom = selector
  } else if (isObject(selector)) {
    options = selector
  }
  this.options = Object.assign({}, defaultOptions, options)

  this.megre()

  this.winEvents()

  return this
}

TocHelper.prototype = {
  megre: function(newOptions = {}) {
    if (!isObject(newOptions)) return
    this.options = Object.assign({}, this.options, newOptions)

    if (isString(this.options.dom)) {
      this.options.dom = $(this.options.dom) || $(SELECTORS.DATA_TOC)
    }
    if (!this.options.dom || !isHTMLElement(this.options.dom)) {
      throw new Error('Not found any content, Please sure this dom is exist')
    }

    let maxDepth = null
    this.options.maxDepth = (maxDepth = parseInt(this.options.maxDepth || 6), maxDepth >= 1 && maxDepth <= 6 ? maxDepth : 6)

    const offsetBody = this.options.offsetBody
    if (!offsetBody || offsetBody === body) {
      this.options.offsetBody = body
    } else if (isHTMLElement(offsetBody)) {
      this.options.offsetBody = isPosition(offsetBody) ? offsetBody : body
    } else if (isString(offsetBody)) {
      const _offsetBody = getDom(offsetBody)
      if (!_offsetBody || _offsetBody === body) {
        this.options.offsetBody = body
      } else {
        this.options.offsetBody = isPosition(offsetBody) ? _offsetBody : body
      }
    } else {
      this.options.offsetBody = body
    }

    this.toc = $(this.options.dom.dataset.toc) || $(`.${this.options.classNames.toc}`)
    const tocClassList = this.toc && this.toc.classList
    tocClassList && !tocClassList.contains(this.options.classNames.toc) && tocClassList.add(this.options.classNames.toc)

    return this
  },
  reload: function() {
    this.hightlight = this.options.hightlight === true ? $(`.${this.options.classNames.hightlight}`) : null

    this.navbar = this.navbar || $(`.${this.options.classNames.navbar}`)

    this.tocEvent()

    this.fixed()

    this.shadow()

    !this.elements && (this.elements = this.loadHeadings())
    this.events = [this.offsetBodyScrollEvent.bind(this)]

    this.offsetBodyScrollDebounce()
    // 默認激活
    this.activeToc()
    // 滾動條位置同步
    this.syncTocScroll()

    // 自動生成滾動條
    this.setTocScroll()
  },
  winEvents: function() {
    const _this = this
    win.addEventListener(resize, function() {
      // 設備大小變化後重新設置高度
      viewHeight = doc.documentElement.clientHeight
      _this.debounce(_this.setTocScroll, 200).call(_this)
    })
  },
  // 設置navbar的滾動條樣式
  setTocScroll: function() {
    this.resetTocScroll()
    const tocFixed = this.options.tocFixed
    const navbar = this.navbar
    if (this.options.autoScroll && tocFixed && this.toc.offsetHeight + (tocFixed.top || 0) > viewHeight) {
      const maxHeight = (viewHeight - this.getOffsetY(navbar) - (tocFixed.top || 0))
      navbar.style.maxHeight = maxHeight + 'px'
      navbar.style.overflowY = 'auto'
    }
  },
  // 重置樣式
  resetTocScroll: function() {
    this.navbar.style.maxHeight = 'inherit'
    this.navbar.style.overflowY = 'inherit'
  },
  // 若有滾動條計算滾動條的位置
  syncTocScroll: function() {
    const navbar = this.navbar; const active = this.active
    if (!active || !hasScrollbar(navbar)) return
    const activeTop = active.offsetTop
    navbar.scrollTo(0, activeTop)
  },
  // 內容/文章的滾動事件處理
  offsetBodyScrollEvent: function() {
    // 目錄高亮顯示
    this.activeToc()
    // 目錄滾動條同步
    this.syncTocScroll()
  },
  addOffsetBodyScrollEvent: function() {
    const el = this.options.offsetBody === body ? win : this.options.offsetBody
    el.addEventListener(scrollEvent, this.events[0])
  },
  removeOffsetBodyScrollEvent: function() {
    const el = this.options.offsetBody === body ? win : this.options.offsetBody
    el.removeEventListener(scrollEvent, this.events[0])
  },
  offsetBodyScrollDebounce: function() {
    this.removeOffsetBodyScrollEvent()
    // 防止抖動
    this.debounce(this.addOffsetBodyScrollEvent, 200).call(this)
  },
  reset: function() {
    this.clear()

    const frag = doc.createDocumentFragment()
    const elements = this.elements = this.loadHeadings()
    const targets = elements.targets
    const levels = elements.levels

    // 創建 brand = 目錄
    if (typeof this.options.brand === 'string') {
      const brand = doc.createElement('div')
      brand.classList.add(this.options.classNames.brand)
      brand.textContent = this.options.brand
      frag.appendChild(brand)
    }

    // 創建navbar
    const navbar = doc.createElement('div')
    navbar.classList.add(this.options.classNames.navbar)
    frag.appendChild(navbar)

    this.navbar = navbar

    // 創建hightlight
    if (this.options.hightlight === true) {
      const hightlight = doc.createElement('div')
      hightlight.classList.add(this.options.classNames.hightlight)
      navbar.appendChild(hightlight)
    }

    const navClassName = this.options.classNames.nav
    // 將節點添加到文檔中
    let lastNavNode = null; let lastLevel = 1
    levels.forEach((level, index, thisArray) => {
      const target = targets[index]
      if (!target) return

      if (index === 0 || thisArray[index - 1] !== level) {
        // 創建nav
        const nav = doc.createElement('nav')
        nav.classList.add(navClassName)
        nav.appendChild(target)

        if (level === 1) {
          // 層級為1
          navbar.appendChild(nav)
        } else if (level >= lastLevel) {
          lastNavNode.appendChild(nav)
        } else {
          let _lastLevelNode = lastNavNode.parentNode
          for (let i = 0; i < lastLevel - level - 1; i++) {
            _lastLevelNode = _lastLevelNode.parentNode
          }
          _lastLevelNode && _lastLevelNode.appendChild(nav)
        }
        lastNavNode = nav
        lastLevel = level
      } else {
        lastNavNode.appendChild(target)
      }
    })

    this.toc.appendChild(frag)

    this.reload()
  },
  getOffsetBodyScrollTop: function() {
    const offsetBody = this.options.offsetBody
    return offsetBody === win ? offsetBody.pageYOffset : offsetBody === body ? doc.documentElement.scrollTop || body.scrollTop : offsetBody.scrollTop
  },
  // __GID().next().value
  GID: function() {
    let current_id = 0; const idPrefix = this.options.idPrefix
    return {
      next: function() {
        current_id++
        const value = `${idPrefix}${current_id}`
        return { value }
      }
    }
  },
  debounce: function(fn, delay) {
    return function() {
      var _this = this; var args = arguments
      fn.timer && clearTimeout(fn.timer)
      fn.timer = setTimeout(() => {
        fn.apply(_this, args)
      }, delay)
    }
  },
  empty: function(parent) {
    if (!parent || !isHTMLElement(parent)) return
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild)
    }
  },
  clear: function() {
    this.empty(this.toc)
    this.elements = null
  },

  activeToc: function() {
    const _this = this
    const elements = _this.elements
    const offsets = elements.offsets
    const targets = elements.targets
    const top = _this.getOffsetBodyScrollTop()
    // 判斷當前滾動條在那個區間
    const index = offsets.findIndex(el => Number(el) > top)

    const tocLink = targets[index]

    tocLink && (this.setActive(tocLink))
  },
  getOffsetY: function(el, stopParent = body) {
    let y = el.offsetTop
    if (el.offsetParent && el.offsetParent !== stopParent) {
      y += this.getOffsetY(el.offsetParent)
    }
    return y
  },
  /**
   * 獲取heading對應的信息
   * @returns levels 所有元素的層級
   * @returns offsets heading元素的偏移量
   * @returns sources heading元素集合
   * @returns targets heading元素對於的目錄元素
   */
  loadHeadings: function() {
    const _this = this; const maxDepth = this.options.maxDepth
    const rootLevel = 1; const lastLevel = maxDepth
    const headings = Array.from(this.options.dom.querySelectorAll(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, maxDepth).join(',')) || [])
    const GID_GENERATE = this.GID()

    /**
     * 元素退級處理
     * @param {*} headings heading元素集合
     * @param {*} curIndex 當前元素在headings集合中的下表
     * @param {*} curOriginaLevel 當前元素原始的層級
     */
    const backLevel = function(headings, curIndex, curOriginaLevel) {
      // if (headings[curIndex].textContent.indexOf('Test') > -1) debugger

      // 小於1 和當前為第一個heading的層級均為1
      if (curOriginaLevel <= rootLevel || curIndex === 0) return rootLevel

      // 大於最大層級的heading層級均為maxDepth
      if (curOriginaLevel > lastLevel) return lastLevel

      // 將當前heading的層級和heading之前的層級對比，進行退級或保留層級操作
      const _headings = headings.filter((head, i) => i < curIndex)

      for (let i = _headings.length - 1; i >= 0; i--) {
        // 上一個heading的層級 - 經過退級操作的層級
        const preLevel = _headings[i][1]
        // 上一個heading
        const preHeading = _headings[i][3]

        // 上一個heading的元素原始層級
        const preOriginaLevel = +preHeading.nodeName[1]

        if (curOriginaLevel < preOriginaLevel) {
          // 當前層級比上一層級小直接退級到上一層級 - 對比原始層級
          if (curOriginaLevel > preLevel) {
            // 當前層級比上一層級退級的大
            return preLevel
          }
          return curOriginaLevel// preLevel
        } else if (curOriginaLevel === preOriginaLevel) {
          // 當前層級於上一層級相等直接等於上一層級 - 對比原始層級
          return preLevel
        } else if (preOriginaLevel < curOriginaLevel) {
          // 當前層級比上一層級大 ， 退級到上一層級+1 - 對比原始層級
          // 此處對比原始層級無意義
          return preLevel + 1
        }
        // 繼續 對比
      }
    }
    /**
     * 設置heading的id
     * @param {*} heading 給沒有ID或ID重複的heading設置Id
     */

    const setId = function(heading) {
      if (!heading.id || $$(`#${CSS.escape(heading.id)}`).length !== 1) {
        heading.id = GID_GENERATE.next().value
      }
      return heading
    }
    /**
     * 獲取當前heading元素到offsetBody元素的距離
     * @param {*} heading  heading元素
     */
    /* const getOffsetY = function (heading) {
        let y = heading.offsetTop
        if (heading.offsetParent && heading.offsetParent !== _this.options.offsetBody) {
            y += getOffsetY(heading.offsetParent)
        }
        return y
    } */
    /**
     * 獲取toclink
     * @param {*} heading
     * @param {*} level
     */
    const loadTocLink = function(heading, level) {
      if (!heading.textContent.replace(/\s/g, '')) return false
      let tocLink = _this.toc.querySelector(`a[href="#${CSS.escape(heading.id)}"]`)
      if (!tocLink) {
        // 不存在就創建一個
        tocLink = doc.createElement('a')
        tocLink.href = `#${CSS.escape(heading.id)}`
        tocLink.classList.add(_this.options.classNames.link)
        if (level >= 2) {
          tocLink.classList.add(`${_this.options.classNames[`marginLeft${level - 1}`]}`)
        }
        tocLink.textContent = heading.textContent
      }
      return tocLink
    }

    headings.forEach((heading, i, thisArray) => {
      // 獲取層級
      const level = backLevel(thisArray, i, +heading.nodeName[1])
      // 獲取當前heading元素距離父級的距離
      const y = _this.getOffsetY(heading, _this.options.offsetBody)
      // 設置ID
      setId(heading)
      // 獲取toc目錄
      const tocLink = loadTocLink(heading, level)
      /* if(tocLink === false){
          thisArray.splice(i, 1)
          i = i - 1
      }else{
      } */
      /* * @returns 0 heading元素下標 */
      /* * @returns 1 heading元素的層級 */
      /* * @returns 2 heading到父級（offsetBody ）的距離*/
      /* * @returns 3 heading元素本身 */
      /* * @returns 4 heading元素對應的link元素 */
      // [0, level, offsetTop, element, tocLinkElement]
      thisArray.splice(i, 1, [i, level, y, heading, tocLink])
    })

    const elements = { levels: [], offsets: [], sources: [], targets: [] }
    headings.forEach((headingItem, i) => {
      elements.levels[i] = headingItem[1]
      elements.offsets[i] = headingItem[2]
      elements.sources[i] = headingItem[3]
      elements.targets[i] = headingItem[4]
    })
    return elements
  },
  setActive: function(el) {
    let active = this.active
    let classList = active ? active.classList : []

    const activeClassName = this.options.classNames.active
    const defaultActiveSelector = `.${this.options.classNames.link}.${this.options.classNames.active}`

    // 移除激活狀態
    active && classList.contains(activeClassName) && classList.remove(activeClassName)

    active = this.active = el && isHTMLElement(el) ? el : $(defaultActiveSelector)
    classList = active && (active.classList || [])

    // 激活狀態
    active && !classList.contains(activeClassName) && classList.add(activeClassName)

    // 設置高亮
    this.setHightlight(active)
  },
  setHightlight: function(active) {
    if (!this.hightlight) return
    if (!active) {
      this.hightlight.style.top = 0
      this.hightlight.style.height = 0
    } else {
      this.hightlight.style.top = active.offsetTop + 'px'
      this.hightlight.style.height = active.offsetHeight + 'px'
    }
  },
  __enter: function(e) {
    this.setHightlight(e.target)
  },
  __leave: function() {
    this.setActive(this.active)
  },
  __click: function(e) {
    // 防止滾動條抖動
    this.offsetBodyScrollDebounce()
    this.setActive(e.target)
  },
  // toc 事件
  tocEvent: function() {
    if (!this.hightlight) return

    const _this = this
    Array.from($$(`.${this.options.classNames.toc} .${this.options.classNames.link}`) || []).forEach(a => {
      // 懸停事件
      a.addEventListener(enterEvent, _this.__enter.bind(_this))
      // 離開事件
      a.addEventListener(leaveEvent, _this.__leave.bind(_this))
      // 點擊事件
      a.addEventListener(clickEvent, _this.__click.bind(_this))
    })
  },
  // 陰影
  shadow: function() {
    if (this.options.shadow === false) return
    const toc = this.toc; const classList = toc && (toc.classList || []); const shadow = this.options.shadow
    !classList.contains(shadow) && classList.add(shadow)
  },
  // fixed
  fixed: function() {
    const toc = this.toc
    const tocFixed = this.options.tocFixed
    if (!toc) return
    const tocFixedClassName = this.options.classNames.fxied
    const classList = toc.classList
    if (tocFixed === false) {
      toc.style.top = 'inherit'
      toc.style.left = 'inherit'
      classList.contains(tocFixedClassName) && classList.remove(tocFixedClassName)
    } else {
      !classList.contains(tocFixedClassName) && classList.add(tocFixedClassName)
      tocFixed.top && (toc.style.top = tocFixed.top + 'px')
      tocFixed.left && (toc.style.left = tocFixed.left + 'px')
    }
  }
}
export default TocHelper
