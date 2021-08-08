import $ from '../assets/lib/toast/jquery.toast.min'
const utils = {
  /* 重新註冊錨點功能*/
  registerAnchorFunc: (dom, isHover) => {
    dom.find('a[href]').each((i, e) => {
      ((dom) => {
        const anchor = dom.attr('href')
        dom.click(function() {
          const anchorDom = document.querySelector(anchor)
          anchorDom ? anchorDom.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }) : ''
        })
        dom.attr('id', 'nav' + anchor)
        dom.attr('href', 'javascript:void(0);')
      })($(e))
    })
  },
  copyToClip: (text) => {
    const textarea = document.createElement('textarea') // 創建input對象
    document.body.appendChild(textarea)
    textarea.value = text
    textarea.focus()
    if (textarea.setSelectionRange) {
      textarea.setSelectionRange(0, textarea.value.length) // 獲取光標起始位置到結束位置
    } else {
      textarea.select()
    }
    const flag = document.execCommand('copy') // 執行複製
    document.body.removeChild(textarea)
    return flag
  },
  initPreCodeCopyBtn: (preDom) => {
    const initFlag = 'initedCopyBtn'
    const dom = $(preDom)
    if (dom.hasClass(initFlag)) {
      return
    }
    dom.addClass(initFlag)
    const copyBtn = $("<span class='copyBtn icon iconfont copy'></span>")
    copyBtn.click((e) => {
      const codeDom = $(e.target).closest('pre').find('code')
      utils.copyToClip(codeDom.text())
      utils.showInfoMsg('複製成功!')
    })
    dom.prepend(copyBtn)
  },
  uuid() {
    const s = []
    const hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  },
  removeUnClick: function(el) {
    const unClickCache = this.unClickCache || {}
    if (unClickCache[el]) {
      $(document).unbind('click', unClickCache[el])
      delete unClickCache[el]
    }
  },
  registerUnClick: function(el, unclickEvent) {
    const unClickCache = this.unClickCache || {}
    if (unClickCache[el]) {
      $(document).unbind('click', unClickCache[el])
      delete unClickCache[el]
    }
    const func = function(e) {
      const parent = $(e.target).closest(el)
      if (parent.length == 0) {
        unclickEvent()
      }
    }
    unClickCache[el] = func
    $(document).bind('click', func)
  },
  delayPromise: (delayTime) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, delayTime)
    })
  },

  showInfoMsg: (msg) => {
    /* $.toast({
      heading: 'Can I add <em>icons</em>?',
      text: 'Yes! check this <a href="https://github.com/kamranahmedse/jquery-toast-plugin/commits/master">update</a>.',
      hideAfter: false,
      icon: 'success'
    })*/
    $.toast({
      text: msg,
      icon: 'info',
      hideAfter: 2000,
      position: 'top-center',
      loader: false
    })
  },
  showErrMsg: (msg) => {
    $.toast({
      text: msg,
      icon: 'error',
      hideAfter: 2000,
      position: 'top-center',
      loader: false
    })
  },
  getTextWidth: function(str, fontSize) {
    let width = 0
    const html = document.createElement('span')
    html.innerText = str
    html.className = 'getTextWidth'
    html.style.fontSize = fontSize + 'px'
    document.querySelector('body').appendChild(html)
    width = document.querySelector('.getTextWidth').offsetWidth
    document.querySelector('.getTextWidth').remove()
    return width
  },
  getNowTime: function() {
    const dates = new Date()
    const years = dates.getFullYear()
    let months = dates.getMonth() + 1
    months = months < 10 ? '0' + months : months
    let days = dates.getDate()
    days = days < 10 ? '0' + days : days
    let hours = dates.getHours()
    hours = hours < 10 ? '0' + hours : hours
    let mins = dates.getMinutes()
    mins = mins < 10 ? '0' + mins : mins
    return years + '-' + months + '-' + days + ' ' + hours + ':' + mins
  },
  cnblogUtils: {
    openWindow: function(n, t, i, r) {
      const u = (screen.width - t) / 2 - r
      const f = (screen.height - i) / 2 - r
      const e = window.open(n, '_blank', 'width=' + t + ',height=' + i + ',toolbars=0,resizable=1,left=' + u + ',top=' + f)
      e.focus()
    },
    openImageUploadWindow: function(callback) {
      try {
        let tmpText = $('#imgTmp')
        if (tmpText.length == 0) {
          tmpText = $("<textarea id='imgTmp'></textarea>")
          tmpText.focus(() => {
            if (tmpText.val() != '') {
              const url = tmpText.val()
              tmpText.val('')
              callback ? callback(url.replace('[img]', '![](').replace('[/img]', ')')) : ''
            }
          })
          $('body').append(tmpText)
        }
        tmpText.val('')
        const n = location.protocol + '//upload.cnblogs' + location.hostname.substring(location.hostname.lastIndexOf('.')) + '/imageuploader/upload?host=www.cnblogs.com&editor=0#imgTmp'
        document.domain = 'cnblogs.' + location.hostname.substring(location.hostname.lastIndexOf('.') + 1, location.hostname.length)
        this.openWindow(n, 450, 120, 200)
      } catch (e) {
        console.error(e)
        utils.showErrMsg('啟動圖片上傳失敗')
      }
    },

    insertUbbUrl: function(n) {
      let res = ''
      const i = prompt('顯示鏈接的文本.\n如果為空，那麼將只顯示超級鏈接地址', ''); let t
      i != null && (t = prompt('http:// 超級鏈接', 'http://'),
      t != '' && t != 'http://' && (i != '' ? res = ('[url=' + t + ']' + i + '[/url]') : res = ('[url]' + t + '[/url]')))
      return res
    },
    insertUbbCode: function(callback) {
      try {
        const n = 450; const t = 400; const r = (screen.width - n) / 2; const u = (screen.height - t) / 2; let i
        document.domain = 'cnblogs.' + location.hostname.substring(location.hostname.lastIndexOf('.') + 1, location.hostname.length)
        i = window.open('/SyntaxHighlighter.htm', '_blank', 'width=' + n + ',height=' + t + ',toolbars=0,resizable=1,left=' + r + ',top=' + u)
        i.focus()
        window.InsertCodeToEditor = function(n) {
          callback ? callback(n) : ''
          i.close ? i.close() : ''
        }
      } catch (e) {
        console.log(e)
        utils.showErrMsg('啟動代碼上傳失敗')
      }
    }
  },
  textAreaUtils: {
    /* 獲得光標區域*/
    getTextareaCursor: function(textarea) {
      const rangeData = {
        text: '',
        start: 0,
        end: 0
      }
      if (textarea.setSelectionRange) {
        textarea.focus()
        rangeData.start = textarea.selectionStart
        rangeData.end = textarea.selectionEnd
        rangeData.text = (rangeData.start !== rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : ''
      }
      return rangeData
    },
    /* 設置光標區域*/
    setTextareaCursor: function(textarea, rangeData) {
      let oR, start, end
      textarea.focus()
      if (textarea.setSelectionRange) {
        textarea.setSelectionRange(rangeData.start, rangeData.end)
      }
    },
    /* 光標區域設置文本*/
    addTextareaCursor: function(textarea, cursor, text) {
      // textarea 容器； cursor：光標位置和選中內容； text：要插入的文本
      let oValue, nValue, oR, nStart, nEnd, st
      const sR = ''
      this.setTextareaCursor(textarea, cursor) // 調用獲取位置
      if (textarea.setSelectionRange) {
        oValue = textarea.value
        nValue = oValue.substring(0, cursor.start) + text + oValue.substring(cursor.end)
        nStart = nEnd = cursor.start + text.length
        st = textarea.scrollTop
        textarea.value = nValue
        if (textarea.scrollTop !== st) {
          textarea.scrollTop = st
        }
        textarea.setSelectionRange(nStart, nEnd)
      }
    }
  }
}
export default utils
