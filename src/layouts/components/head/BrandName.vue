<template>
  <div id="brand_name">
    <div class="max-screen">
      <div class="max-screen-wrap">
        <span class="icon iconfont home head-brand-color" />
        <router-link class="blog-name head-brand-color" :to="'/'" tag="span">&nbsp;{{ blogHeadTitle }}</router-link>
      </div>
    </div>
    <div class="min-screen" @click="$baseEventBus.$emit('switchPanelAside')">
      <div class="min-screen-wrap">
        <span class="icon iconfont menu" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    blogHeadTitle() {
      return this.$store.getters['bloginfo/blogHeadTitle']
    }
  }
}
</script>

<style lang="scss">
#brand_name {
  display: inline-block;
  height: $headHeight;
  width: 230px;
  .max-screen {
    position: relative;
    height: 100%;
    @include switchHeadBar() {
      display: none;
    }
    .max-screen-wrap {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);

      .icon,
      .blog-name {
        font-weight: bold;
        font-size: 19px;
        cursor: pointer;
        text-align: center;
        height: 100%;
      }
      .icon {
        font-size: 21px;
        position: relative;
        bottom: -2px;
      }
    }
  }
  .min-screen {
    width: $headHeight;
    height: 100%;
    display: none;
    @include switchHeadBar() {
      display: inline-block;
    }
    .min-screen-wrap {
      width: $headHeight;
      height: $headHeight;
      cursor: pointer;
      position: absolute;
      z-index: 3;
      .icon {
        color: #a6a8b1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .min-screen-wrap:hover {
      .icon {
        color: rgba(234, 235, 237, 0.99);
      }
      background-color: rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
