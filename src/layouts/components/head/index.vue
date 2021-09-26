<template>
  <div id="blog_head_bar" ref="blogHeadBar" class="head-back-color" :style="{height:minShowSet?'250px':'50px'}">
    <BrandName />
  </div>
</template>

<script>
import BrandName from './BrandName'
export default {
  components: { BrandName },
  data: () => {
    return {
      minShowSet: false
    }
  }
}
</script>

<style lang="scss">
  #blog_head_bar {
    position: relative;
    z-index: 100;
    transition: all 0.4s ease 0s;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,.05);
    .float-right-wrap {
      height: 100%;
      float: right;
      @include switchHeadBar(){
        height: 0px;
        float: none;
        z-index: -1;
        position: absolute;
        width: 100%;
      }
    }
  }
</style>
