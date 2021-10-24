<template>
  <div>
    <template v-for="menu in menuList">
      <el-submenu v-if="menu.children" :key="menu.name" :index="menu.url?menu.url:indexPrefix+menu.id">
        <template slot="title">
          <i :class="menu.icon" />
          <span slot="title">{{ menu.name }}</span>
        </template>
        <menu-tree :menu-list="menu.children" :index-prefix="indexPrefix" />
      </el-submenu>
      <el-menu-item v-else :key="menu.name" :index="menu.url?menu.url:indexPrefix+menu.id" @click="open(menu.url?menu.url:indexPrefix+menu.id)">
        <i :class="menu.icon" />
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  // eslint-disable-next-line vue/require-prop-types
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    indexPrefix: {
      type: String,
      default: ''
    }
  },
  methods: {
    open(url) {
      try {
        window.open(new URL(url).href)
      } catch (error) {
        this.$router.push(url)
      }
    }
  }
}
</script>
