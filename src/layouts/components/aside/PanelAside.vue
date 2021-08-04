<template>
  <div id="panel_aside" class="panel-aside-back-color">
    <div class="panel-aside-wrap none-base-scroll">
      <AvatarArea />
      <MenuItems menu-identify="1" menu-title="導航" :menu-list="mainExtNav" />
      <MenuItems menu-identify="2" menu-title="組成" :menu-list="funcMenuNav" />
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

/* 面板側邊控件*/
import AvatarArea from './AvatarArea'
import MenuItems from './MenuItems'
import BlogContext from '@/context/BlogContext'
import blogApi from '@/utils/BlogApi'
import blogKit from '@/utils/BlogKit'
const friendList = Object.assign([{ title: 'C君博客', url: 'https://www.cnblogs.com/cjunn/' }], BlogContext.blogFriendList)
export default {
  name: 'PanelAside',
  components: { MenuItems, AvatarArea },
  data: () => {
    return {
      mainExtNav: BlogContext.mainExtNav,
      funcMenuNav: []

    }
  },
  created: function() {
    blogApi.loadSideColumn().then((data) => {
      this.funcMenuNav.push({
        title: '隨筆分類',
        icon: 'menu',
        children: blogKit.convertSubjectUrls(data.catListPostCategory)
      }, {
        title: '隨筆檔案',
        icon: 'paper',
        children: blogKit.convertSubjectUrls(data.catListPostArchive)
      }, {
        title: '隨筆標籤',
        icon: 'label',
        children: blogKit.convertSubjectUrls(data.catListTag)
      }, {
        title: '常用鏈接',
        icon: 'pen',
        children: data.catListLink
      }, {
        title: '友鏈',
        icon: 'links',
        children: friendList
      })
    })
  },
  methods: {
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
