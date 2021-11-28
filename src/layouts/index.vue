<template>
  <div id="blog_panel">
    <BlogHeadBar class="blog-head-bar" />
    <div class="main-panel">
      <PanelAside
        id="panel_aside"
        class="panel-aside"
        :class="{'blog-aside-show':asideIsShow,'blog-aside-hide':!asideIsShow}"
      />
      <div class="panel-aside-shape" :class="!asideIsShow?'panel-aside-shape-hide':''" @click="asideIsShow=false">sss
      </div>
      <div ref="routerView" class="route-body none-base-scroll" @scroll="panelScrollEvent">
        <div id="panel_top_target" />
        <router-view class="router-view-wrap" :style="{'min-Height':routeMinHeight+'px'}" />
        <BlogBottom />
        <div id="panel_bottom_target" />
      </div>
    </div>
  </div>
</template>

<script>
import BlogHeadBar from './components/head/index'
import PanelAside from './components/aside/index'
import BlogBottom from './components/bottom/index'

export default {
  components: {
    BlogBottom, // 上方headBar
    PanelAside, // 左側欄
    BlogHeadBar // 下方作者Blog 資訊
  },
  data() {
    return {
      routeMinHeight: '',
      asideIsShow: false
    }
  },
  created() {
    this.eventBus()
    this.blogInit()
  },
  mounted() {
    this.routeMinHeight = this.$refs.routerView.clientHeight - 40
    this.$baseEventBus.$emit('panelScrollEvenInit', this.$refs.routerView)
  },
  methods: {
    eventBus() {
      /* 監控滑到頂部事件*/
      this.$baseEventBus.$on('panelToTop', () => {
        document
          .getElementById('panel_top_target')
          .scrollIntoView({ behavior: 'smooth' })
      })
      /* 監控滑到底部事件*/
      this.$baseEventBus.$on('panelToBottom', () => {
        document
          .getElementById('panel_bottom_target')
          .scrollIntoView({ behavior: 'smooth' })
      })
      /* 小屏切換頂部設置界面*/
      this.$baseEventBus.$on('switchPanelAside', () => {
        this.asideIsShow = !this.asideIsShow
      })
    },
    // 觸發文章目錄
    panelScrollEvent(e) {
      this.$baseEventBus.$emit('panelScrollEven', e)
    },
    // Blog 初始化數據
    blogInit() {
      // 獲取文章總數
      this.$store.dispatch('bloginfo/setBlogArticleTotal')
      // 獲取 Blog 相關資訊
      this.$store.dispatch('bloginfo/setBlogInfo')
    }
  }
}
</script>

<style lang="scss">
#blog_panel {
  display: inline-block;
  @include panelWidth();
  height: 100%;
  text-align: left;
  font-size: 0px;
  position: relative;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
  opacity: 0.98;
  .blog-head-bar {
    height: $headHeight;
    z-index: 10;
  }

  .main-panel {
    height: calc(100% - #{$headHeight});
    position: relative;
    left: 0;

    @include switchHeadBar() {
      .blog-aside-show {
        @include showAside();
      }
      .blog-aside-hide {
        @include hideAside();
      }
    }
    .panel-aside-shape {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 3;
      background-color: rgba(0, 0, 0, 0.3);
      display: none;
      @include switchHeadBar() {
        display: inline-block;
      }
    }
    .panel-aside-shape-hide {
      display: none;
    }
    .panel-aside {
      position: absolute;
      left: 0;
      z-index: 4;
      transition: all 0.3s ease-out 0.1s;
      width: 230px;
      height: 100%;
      display: inline-block;
      vertical-align: top;
      box-shadow: 0.8px 0.8px 0.8px rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
    }

    .loading-bar-clz {
      width: 100%;
      position: absolute;
      vertical-align: top;
      z-index: 2;
      width: calc(100% - 230px);
      left: 230px;
      @include switchHeadBar() {
        width: 100%;
        left: 0;
      }
    }

    .loading-body-clz {
      transition: all 0.25s ease-in-out 0s;
      position: absolute;
      vertical-align: top;
      z-index: 2;
      width: calc(100% - 230px);
      left: 230px;
      @include switchHeadBar() {
        width: 100%;
        left: 0;
      }
    }

    .route-body {
      background-color: #f6f8f9;
      left: 230px;
      width: calc(100% - 230px);
      @include switchHeadBar() {
        left: 0px;
        width: 100%;
      }
      position: absolute;
      top: 0;

      overflow-y: scroll;
      display: inline-block;
      height: 100%;
      overflow-x: hidden;
      vertical-align: top;
      .router-view-wrap {
        min-height: calc(100% - 40px);
      }
    }
  }
}
</style>
