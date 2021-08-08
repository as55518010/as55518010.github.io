import $ from '@/assets/lib/emoji/jquery.emoji'
import BlogContext from '@/context/BlogContext'

const emojiOption = function(btnDom, inpCall) {
  return {
    showTab: true,
    animation: 'fade',
    button: btnDom,
    inpCall: inpCall,
    icons: BlogContext.faceIcon
  }
}

export default {
  initTextArea: (textAreaId, btnDom, inpCall) => {
    $('#' + textAreaId).emoji(emojiOption(btnDom, inpCall))
  },
  parseText: (sourceText) => {
    const dom = $('<span>' + sourceText + '</span>')
    dom.emojiParse(emojiOption())
    const reStr = dom.html()
    dom.remove()
    return reStr
  }
}
