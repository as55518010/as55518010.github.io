<template>
  <div id="blog_navicat_page">
    <div class="blog-navicat-page" :class="{'blog-fixed':blogFixed}">
      <div id="toc_page" class="toc toc-fixed shadow" style="top: 0px; max-width: 100%; padding: 0px; margin: 0px;">
        <div class="toc-brand">目錄<span class="icon iconfont top topBtn " :class="{'topBtnDown':topBtnToDown}" @click="scrollAnchor" /></div>
        <div class="toc-navbar" style="max-height: inherit; overflow-y: inherit;">
          <div class="toc-hightlight" style="top: 0px; height: 32px;" />
          <nav class="toc-nav">
            <span v-for="(val,key) in toc" :key="key">
              <a href="javascript:;" class="toc-link" :class="[tocLinkLevel(val.level),tocLinkActive(key)]" @click.prevent="tocScrollToTarget(key)">{{ val.name }}</a>
            </span>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import '@/styles/toc-helper.min.css'

import { scrollToTarget, isBottom, onScrollAnchor } from '@/utils/Scroll.js'

import { replace } from 'lodash-es'

export default {
  data: () => {
    return {
      isOpenFullScreen: false,
      maxDepth: 6,
      toc: [],
      blogFixed: false,
      topBtnToDown: true,
      tocTargets: { },
      routerView: {},
      active: 0
    }
  },
  beforeRouterEnter() {
    // $('#toc_page').empty()
  },

  created() {
    // this.$baseEventBus.$on('articleDestroy', () => {
    //   // $('#toc_page').empty()
    // })
    this.eventBus()
  },
  mounted() {
    this.$baseEventBus.$on('panelScrollEvenInit', e => {
      this.routerView = e
    })
  },
  methods: {
    tocLinkLevel(level) {
      return level === 0 ? '' : `ml-${level}`
    },
    tocLinkActive(key) {
      return key === this.active ? 'active' : ''
    },
    eventBus() {
      this.$baseEventBus.$on('panelScrollEven', e => {
        this.active = onScrollAnchor(this.tocTargets, e.target.scrollTop)
        // active
        if (isBottom(e.target)) {
          this.topBtnToDown = false
          this.active = this.tocTargets.length - 1
        } else {
          this.topBtnToDown = true
        }
        if (e.target.scrollTop > 60) {
          this.blogFixed = true
        } else {
          this.blogFixed = false
        }
      })
      // 監聽生成目錄
      this.$baseEventBus.$on('articleInited', dom => {
        this.createToc(dom)
      })
    },
    createToc(dom) {
      this.tocTargets = Array.from(
        dom.querySelectorAll(
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, this.maxDepth).join(',')
        ) || []
      )
      this.toc = this.tocTargets.map(node => {
        return {
          level: parseInt(replace(node.nodeName, 'H', '')) - 1,
          name: node.innerHTML,
          node: node
        }
      })
    },
    scrollAnchor() {
      if (this.topBtnToDown) {
        scrollToTarget(this.routerView, this.tocTargets[this.tocTargets.length - 1])
      } else {
        scrollToTarget(this.routerView, this.tocTargets[0])
      }
    },
    tocScrollToTarget(key) {
      scrollToTarget(this.routerView, this.tocTargets[key], '20px')
    }
  }
}
</script>

<style lang="scss">
#blog_navicat_page {
  .blog-navicat-page::-webkit-scrollbar {
    display: none;
  }

  .blog-navicat-page {
    font-size: 12px;
    position: relative;
    width: 235px;
  }
  .blog-fixed {
    position: fixed;
    top: 60px;
  }
}
</style>
