<template>
  <div id="blog_info_page">
    <div class="menu-body-item">
      <div class="menu-body-item-title">
        <div>部落格信息</div>
      </div>
      <div class="menu_blog_info_wrap_clz">
        <div class="menu-body-info">
          <div class="info-item"><span class="info-item-left"><span class="icon iconfont renyuanguanli" />
            <span>作者</span></span> <span class="info-item-right"><span
            class="info-item-bg"
          ><span>{{ blogNickname }}</span></span></span></div>
          <div class="info-item"><span class="info-item-left"><span class="icon iconfont ios-shijian" />
            <span>運行天數</span></span> <span class="info-item-right"><span
            class="info-item-bg"
          ><span>{{ operatingDays }}天</span></span></span></div>
          <div class="info-item"><span class="info-item-left"><span class="icon iconfont paper" />
            <span>文章數量</span></span> <span class="info-item-right"><span
            class="info-item-bg"
          ><span>{{ blogArticleTotal }}</span></span></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    blogNickname() {
      return this.$store.state.bloginfo.author.blogNickname
    },
    blogArticleTotal() {
      return this.$store.state.bloginfo.blogArticleTotal
    },
    operatingDays() {
      return this.$store.getters['bloginfo/operatingDays']
    }
  }
}
</script>
<style lang="scss" >
#blog_info_page {
  .menu-body-item {
    padding: 8px 5px 0px 6px;

    .menu-body-item-title {
      margin-bottom: 10px;
      color: rgb(88, 102, 110);
      font-size: 15px;
    }

    .menu-body-info {
      font-size: 13px;
      color: rgb(68, 82, 90);
      border: 1px solid rgb(226, 232, 234);
      border-radius: 5px;

      .info-item:nth-of-type(n-1) {
        border-bottom: 1px solid rgb(226, 232, 234);
      }

      .info-item {
        cursor: pointer;
        opacity: 0.6;
        background-color: white;
        padding: 10px 20px 10px 20px;
        min-height: 18px;
        .icon {
          position: relative;
          top: -1px;
        }
        span {
          vertical-align: top;
        }

        .info-item-right {
          float: right;
        }
      }
    }
  }
}
</style>
