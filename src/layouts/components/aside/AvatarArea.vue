<template>
  <div id="avatar_area" class="panel-avatar-dec">
    <router-link to="/author" tag="div" class="avatar-area-wrap">
      <img :src="blogAvatarImg" :alt="blogNickname">
      <div class="panel-avatar-sign">
        <div class="name-wrap panel-aside-color">
          <span>{{ blogNickname }}</span>
          <span class="icon iconfont angeldown1" />
        </div>
        <div class="sign-wrap panel-aside-color">
          <span>{{ blogAvatarSign }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    blogNickname() {
      return this.$store.state.bloginfo.blogNickname
    },
    blogAvatarSign() {
      return this.$store.state.bloginfo.blogAvatarSign
    },
    blogAvatarImg() {
      return this.$store.state.bloginfo.blogAvatarImg
    }
  }
}
</script>

<style lang="scss">
#avatar_area:hover {
  background: url("https://cjunn.gitee.io/blog_theme_atum/img/body/float.gif");
  background-size: cover;
}
#avatar_area {
  font-size: 0;
  .avatar-area-wrap {
    position: relative;
    cursor: pointer;
    img {
      box-shadow: 2px 2px 3px #e1e1e1;
    }

    .name-wrap {
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 8px;
      margin-bottom: 2px;

      .icon {
        font-size: 2px;
        position: relative;
        top: 1px;
      }
    }

    .sign-wrap {
      cursor: pointer;
      text-align: center;
      margin-top: 4px;
      font-size: 12px;
    }
  }
}
</style>
