import Vue from 'vue'
import hljs from '@/assets/lib/highlight/highlight.index'
import blogUtils from '@/utils/BlogUtils'

Vue.directive('highlight', function(el) {
  const pres = el.querySelectorAll('pre')
  pres.forEach((pre) => {
    blogUtils.initPreCodeCopyBtn(pre)
  })
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block, index) => {
    setTimeout(() => {
      if (!block.highInit) {
        block.highInit = true
        hljs.highlightBlock(block)
      }
    }, index * 250)
  })
})
