<template>
  <div :class="blogThemeStyle">
    <div id="app" class="body-pic" :style="blogbgImg">
      <router-view />
    </div>
  </div>
</template>

<script>
import './assets/css/theme/style0.scss'
import './assets/css/theme/style1.scss'
export default {
  name: 'App',
  data: () => {
    return {}
  },
  computed: {
    blogbgImg() {
      return this.$store.getters['bloginfo/blogbgImg']
    },
    blogThemeStyle() {
      return this.$store.state.bloginfo.blogThemeStyle
    }
  }
}
</script>

<style lang="scss">
#app {
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
