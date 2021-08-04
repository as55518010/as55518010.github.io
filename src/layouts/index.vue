<template>
  <div id="blog_panel">
    <BlogFullPage />
    <BlogHeadBar class="blog-head-bar" />
    <div class="main-panel">
      <PanelAside id="panel_aside" class="panel-aside" :class="{'blog-aside-show':asideIsShow,'blog-aside-hide':!asideIsShow}" />
      <div class="panel-aside-shape" :class="!asideIsShow?'panel-aside-shape-hide':''" @click="asideIsShow=false">sss</div>
      <LoadingBar ref="loadingBar" class="loading-bar-clz" />
      <LoadingBody ref="loadingBody" class="loading-body-clz" />
      <div ref="routerView" class="route-body none-base-scroll" @scroll="panelScrollEvent">
        <div id="panel_top_target" />
        <router-view ref="routeViewWrap" class="router-view-wrap" :style="{'min-Height':this.routeMinHeight+'px'}" />
        <BlogBottom />
        <div id="panel_bottom_target" />
      </div>
    </div>
  </div>
</template>

<script>
import BlogHeadBar from './components/head/BlogHeadBar'
import PanelAside from './components/aside/PanelAside'
import LoadingBody from './components/common/LoadingBody'
import LoadingBar from './components/common/LoadingBar'
import BlogBottom from './components/bottom/BlogBottom'
import BlogFullPage from './components/full/BlogFullPage'

export default {
  name: 'BlogPanel',
  components: {
    BlogFullPage,
    BlogBottom, LoadingBar, LoadingBody, PanelAside, BlogHeadBar },
  data: () => {
    return {
      loading: true,
      lastPageId: '',
      routeMinHeight: '',
      asideIsShow: false
    }
  },
  created: function() {
  },
  mounted: function() {
    /* 监控滑到顶部事件*/
    this.$baseEventBus.$on('panelToTop', () => {
      document.getElementById('panel_top_target').scrollIntoView({ behavior: 'smooth' })
    })
    /* 监控滑到底部事件*/
    this.$baseEventBus.$on('panelToBottom', () => {
      document.getElementById('panel_bottom_target').scrollIntoView({ behavior: 'smooth' })
    })
    /* 小屏切换顶部设置界面*/
    this.$baseEventBus.$on('switchPanelAside', () => {
      this.asideIsShow = !this.asideIsShow
    })
    /* 全屏加载开启*/
    this.$baseEventBus.$on('fullLoadingOpen', (next) => {
      this.$nextTick(() => {
        this.$refs.loadingBody ? this.$refs.loadingBody.openLoading(() => {
          next ? next() : ''
          this.$refs.routerView.scrollTo(0, 0)
        }) : ''
      })
    })
    /* 全屏加载关闭*/
    this.$baseEventBus.$on('fullLoadingClose', () => {
      this.$nextTick(() => {
        this.$refs.loadingBody ? this.$refs.loadingBody.closeLoading() : ''
      })
    })
    /* 条加载开启*/
    this.$baseEventBus.$on('barLoadingOpen', () => {
      this.$nextTick(() => {
        this.$refs.loadingBar ? this.$refs.loadingBar.openLoadingBar() : ''
      })
    })
    /* 条加载关闭*/
    this.$baseEventBus.$on('barLoadingClose', () => {
      this.$nextTick(() => {
        this.$refs.loadingBar ? this.$refs.loadingBar.closeLoadingBar() : ''
      })
    })
    this.routeMinHeight = (this.$refs.routerView.clientHeight - 40)
  },
  methods: {
    panelScrollEvent: function(e) {
      this.$bus.emit('panelScrollEven', e)
    }
  },
  beforeRouteUpdate: function(to, from, next) {
    this.$bus.emit('fullLoadingOpen', next)
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
    box-shadow: 0 0 4px 3px rgba(0,0,0,.05);
    opacity: .98;
    .blog-head-bar {
      height: $headHeight;
      z-index: 10;
    }

    .main-panel {
      height: calc(100% - #{$headHeight});
      position: relative;
      left: 0;

      @include switchHeadBar(){
        .blog-aside-show {
          @include showAside();
        }
        .blog-aside-hide {
          @include hideAside();
        }
      }
      .panel-aside-shape{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
        background-color: rgba(0,0,0,.3);
        display: none;
        @include switchHeadBar(){
          display: inline-block;
        }
      }
      .panel-aside-shape-hide{
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
        box-shadow: .8px .8px .8px rgba(0, 0, 0, .2);
        box-sizing: border-box;
      }

      .loading-bar-clz {
        width: 100%;
        position: absolute;
        vertical-align: top;
        z-index: 2;
        width: calc(100% - 230px);
        left: 230px;
        @include switchHeadBar(){
          width: 100%;
          left: 0;
        }
      }

      .loading-body-clz {
        transition: all .25s ease-in-out 0s;
        position: absolute;
        vertical-align: top;
        z-index: 2;
        width: calc(100% - 230px);
        left: 230px;
        @include switchHeadBar(){
          width: 100%;
          left: 0;
        }
      }

      .route-body {
        background-color: #F6F8F9;
        left: 230px;
        width: calc(100% - 230px);
        @include switchHeadBar(){
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
        .router-view-wrap{
          min-height: calc(100% - 40px);
        }
      }
    }
  }
</style>
