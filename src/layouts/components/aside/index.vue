<template>
  <div id="panel_aside" class="panel-aside-back-color">
    <div class="panel-aside-wrap none-base-scroll">
      <AvatarArea />
      <MenuItems
        menu-title="導航"
        :menu-list="mainExtNav"
        :router="true"
        :default-active="routeActive"
      />
      <MenuItems
        menu-title="組成"
        :menu-list="categoryMenuNav"
        index-prefix="/subject/category/"
        :router="true"
        :default-active="routeActive"
      />
      <MenuItems
        :menu-list="seriesMenuNav"
        index-prefix="/subject/series/"
        :router="true"
        :default-active="routeActive"
      />

    </div>
    <div class="panel-aside-bottom">
      <!-- <div class="blog-menu-bar panel-aside-color">
        <div @click="openManage">
          <div class="icon iconfont cogs" />
          <div>管理</div>
        </div>
        <div @click="openRss">
          <div class="icon iconfont rss" />
          <div>文章</div>
        </div>
        <div @click="openMail">
          <div class="icon iconfont talk" />
          <div>聯繫</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
/* 面板側邊控件*/
import AvatarArea from './AvatarArea'
import MenuItems from './MenuItems'

export default {
  components: { MenuItems, AvatarArea },
  data: () => {
    return {
      routeActive: '',
      mainExtNav: [
        { name: '首頁', url: '/subject/home', icon: 'home' },
        {
          name: '博主簡歷',
          url: 'https://www.cnblogs.com/cjunn/',
          icon: 'face2'
        }
      ]
    }
  },
  computed: {
    categoryMenuNav() {
      return this.$store.getters['category/getCategoryMenuNav']
    },
    seriesMenuNav() {
      return this.$store.getters['series/getSeriesMenuNav']
    }
  },
  created() {
    this.getCategorys()
    this.getSeries()
    this.eventBus()
  },
  methods: {
    eventBus() {
      this.$baseEventBus.$on('onRouteActive', routeActive => {
        this.routeActive = routeActive
      })
    },
    // 獲取類別
    async getCategorys() {
      this.$store.dispatch('category/setCategorys')
    },
    // 獲取系列
    async getSeries() {
      this.$store.dispatch('series/setSeries')
    }
  }
}
</script>

<style lang="scss">
#panel_aside {
  width: 100%;
  height: 100%;
  position: relative;

  .panel-aside-wrap {
    position: absolute;
    top: 0;
    bottom: $headHeight;
    overflow-y: scroll;
    width: 100%;
  }

  .panel-aside-bottom {
    position: absolute;
    bottom: 0px;
    height: $headHeight;
    width: 100%;

    .blog-menu-bar {
      padding-top: 5px;
      display: flex;
      font-size: 12px;
      position: relative;
      > div {
        cursor: pointer;
        margin-top: 6px;
        display: inline-block;
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
