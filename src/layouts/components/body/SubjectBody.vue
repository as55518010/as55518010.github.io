<template>
  <div id="route_body">
    <router-view ref="routeView" class="inner-route-body" />
    <pub-aside ref="pubAside" class="pub-aside" />
  </div>

</template>

<script>
import PubAside from './aside/PubAside'

export default {
  name: 'SubjectBody',
  components: { PubAside }
}
</script>

<style lang="scss">
#route_body {
  position: relative;
  .inner-route-body {
    display: inline-block;
    width: 922px;
    vertical-align: top;
    position: relative;
    @include worksBodyWidth();
  }
  .pub-aside {
    @include deve4() {
      display: none;
    }
    @include switchHeadBar() {
      display: none;
    }
    display: inline-block;
    width: 248px;
    vertical-align: top;
    position: relative;
    border-left: 1px solid #e2e8ea;
    box-sizing: border-box;
    left: -1px;
  }
}
</style>
