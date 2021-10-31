<template>
  <div id="panel_aside" class="panel-aside-back-color">
    <div class="panel-aside-wrap none-base-scroll">
      <AvatarArea />
      <MenuItems
        menu-title="導航"
        :menu-list="mainExtNav"
        :default-active="routeActive"
      />
      <MenuItems
        menu-title="組成"
        :menu-list="categoryMenuNav"
        index-prefix="/subject/category/"
        :default-active="routeActive"
      />
      <MenuItems
        :menu-list="seriesMenuNav"
        index-prefix="/subject/series/"
        :default-active="routeActive"
      />

    </div>
  </div>
</template>

<script>
/* 面板側邊控件*/
import AvatarArea from './AvatarArea'
import MenuItems from './MenuItems'
import { curriculumVitae } from '@/config/index.js'

export default {
  components: { MenuItems, AvatarArea },
  data: () => {
    return {
      routeActive: '',
      mainExtNav: [
        { name: '首頁', url: '/subject/home', icon: 'home' },
        {
          name: '版主履歷',
          url: curriculumVitae,
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
