<template>
  <div id="panel_aside" class="panel-aside-back-color">
    <div class="panel-aside-wrap none-base-scroll">
      <AvatarArea />
      <MenuItems menu-title="導航" :menu-list="mainExtNav" />
      <MenuItems
        menu-title="组成"
        :menu-list="funcMenuNav"
        index-prefix="/subject/category/"
        :router="true"
        :default-active="$route.path"
      />

      <!-- <MenuItems :menu-list="funcMenuNav" index-prefix="category/" :router="true" /> -->
    </div>
    <div class="panel-aside-bottom">
      <div class="blog-menu-bar panel-aside-color">
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
      </div>
    </div>
  </div>
</template>

<script>
import { getCategorie } from '@/api/categorie'
/* 面板側邊控件*/
import AvatarArea from './AvatarArea'
import MenuItems from './MenuItems'
import BlogContext from '@/context/BlogContext'
export default {
  name: 'PanelAside',
  components: { MenuItems, AvatarArea },
  data: () => {
    return {
      mainExtNav: [
        { name: '首页', url: '/subject/category/default.html', icon: 'home' },
        {
          name: '博客动态',
          url: 'https://www.cnblogs.com/cjunn/',
          icon: 'comment1'
        },
        {
          name: '博主简历',
          url: 'https://www.cnblogs.com/cjunn/',
          icon: 'face2'
        },
        { name: '主题反馈', url: '/c/subject/p/12494785.html', icon: 'bug' },
        { name: '赞赏博主', url: '/c/subject/p/12495086.html', icon: 'gift' }
      ],
      funcMenuNav: []
    }
  },
  created: function() {
    this.getCategorys()
  },
  methods: {
    // 獲取類別
    async getCategorys() {
      try {
        const { result } = await getCategorie()
        this.funcMenuNav = result
        this.categoryList = result
      } catch (error) {
        this.$message.error(error)
      }
    },
    openManage: () => {
      window.open(BlogContext.manPage)
    },
    openRss: () => {
      window.open(BlogContext.subPage)
    },
    openMail: () => {
      window.open(BlogContext.sendPage)
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
