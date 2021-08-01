<template>
  <div>
    <template v-for="menu in menuData">
      <el-submenu v-if="menu.son" :key="menu.name" :index="menu.name">
        <template slot="title">
          <i :class="menu.icon" />
          <span slot="title">{{ menu.name }}</span>
        </template>
        <menu-tree :menu-data="menu.son" />
      </el-submenu>
      <el-menu-item v-else :key="menu.name" :index="menu.name" @click="childByValue(menu.id)">
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
  props: ['menuData'],
  methods: {
    childByValue(categorieId) {
      this.$baseEventBus.$emit('eventToHandleClick', categorieId)
    }
  }
}
</script>
