<template>
  <div id="blog_navicat_page">
    <div class="blog-navicat-page">
      <div id="toc_page" />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import TocHelper from '@/utils/toc/toc-helper.js'
import blogUtils from '@/utils/BlogUtils'

export default {
  name: 'BlogNavicatPage',
  data: () => {
    return {
      isOpenFullScreen: false
    }
  },
  beforeRouterEnter: function() {
    $('#toc_page').empty()
  },

  created: function() {
    const self = this
    this.$baseEventBus.$on('articleDestroy', (dom) => {
      $('#blog_cloud_ad').show()
      $('#toc_page').empty()
    })
    /* 監聽生成目錄*/
    this.$baseEventBus.$on('articleInited', function(dom) {
      $('#blog_cloud_ad').hide()
      $(dom).attr('data-toc', '#toc_page')
      if ($('#app div[data-toc]').length === 0) {
        return
      }
      $('#toc_page').empty()
      const tocHelper = new TocHelper({
        dom: '#app div[data-toc]',
        offsetBody: document.querySelector('.route-body')
      })
      tocHelper.reset()
      const tocPage = $('#toc_page')
      tocPage.css('max-width', '100%')
      tocPage.css('top', '0')
      tocPage.css('padding', '0')
      tocPage.css('margin', '0')
      $('#toc_page .toc-fixed').css('box-shadow', '0')
      blogUtils.registerAnchorFunc(tocPage)
      const topBtnDom = $("<span class='icon iconfont top topBtn topBtnDown'></span>")
      topBtnDom.click(() => {
        if (topBtnDom.hasClass('topBtnDown')) {
          // Down
          self.$baseEventBus.$emit('panelToBottom', {})
        } else {
          // Up
          self.$baseEventBus.$emit('panelToTop', {})
        }
      })
      $('#toc_page .toc-brand').append(topBtnDom)
      $('.toc-nav').css('max-height', ($('.body-wrap').height() - 140) + 'px')
      self.$baseEventBus.$on('panelScrollEven', (e) => {
        const tocPage = $('.blog-navicat-page')
        if (e.target.scrollTop > 60) {
          topBtnDom.removeClass('topBtnDown')
          tocPage.css('position', 'fixed')
          tocPage.css('top', '60px')
          $('.toc-nav').css('max-height', ($('.body-wrap').height() - 100) + 'px')
        } else {
          $('.toc-nav').css('max-height', ($('.body-wrap').height() - 140) + 'px')
          topBtnDom.addClass('topBtnDown')
          tocPage.css('position', '')
          tocPage.css('top', '')
        }
      })
    })
  }
}
</script>

<style lang="scss">
  #blog_navicat_page {
    .blog-navicat-page::-webkit-scrollbar {
      display: none
    }

    .blog-navicat-page {
      font-size: 12px;
      position: relative;
      width: 235px;
    }

  }
</style>
