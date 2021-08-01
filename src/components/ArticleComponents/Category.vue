<template>
  <!-- <div slot="header" class="clearfix">
    <span><i class="iconfont icon-fenlei"></i> 文章分類</span>
    <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
  </div>
  <div class="wrap">
    <div v-for="(item, index) in categoryList" :key="index" style="margin-right:1rem" @click="handleClick(item.category)">
      <el-badge :value="item['COUNT(category)']" class="item" :type="categroyColor[index]">
        <el-button size="small">{{item.category}}</el-button>
      </el-badge>
    </div>
  </div> -->
  <!-- <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-menu" />
        <span slot="title">文章分類</span>
      </template>
      <el-menu-item
        v-for="(item, index) in categoryList"
        :key="index"
        @click.native="handleClick(item.category)"
      >
        {{ item.category }}
        <span style="float:right">{{ item["COUNT(category)"] }}</span>
      </el-menu-item>
    </el-submenu> -->
  <el-submenu class="category" index="6">
    <template slot="title">
      <i class="el-icon-menu" />
      <span slot="title">文章分類</span>
    </template>
    <MenuTree :menu-data="categoryList" />
  </el-submenu>
</template>

<script>
import { getCategorie } from '@/api/categorie'
import MenuTree from '@/components/MenuTree/index.vue'
export default {
  name: 'Category',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MenuTree
  },
  data() {
    return {
      categroyColor: [
        'primary',
        'success',
        'warning',
        'danger',
        'primary',
        'info',
        'primary',
        'success',
        'warning',
        'danger',
        'primary',
        'info'
      ],
      // 當前點擊分類
      category: '',
      // 數組
      categoryList: []
    }
  },
  mounted() {
    this.getCategorys()
  },
  beforeUpdate() {
    this.$baseEventBus.$on('eventToCategory', val => {
      console.log('eventToCategory')
    })
    // 點擊分類顯示文章
    this.$baseEventBus.$on('eventToHandleClick', categorieId => {
      this.$router.push(`/article/${categorieId}`)
      this.emitToLeft(categorieId)
    })
  },
  methods: {
    // 獲取文章分類
    async getCategorys() {
      try {
        const { result } = await getCategorie()
        this.categoryList = result
      } catch (error) {
        this.$message.error(error)
      }
    },
    emitToLeft(categorieId) {
      this.$baseEventBus.$emit('eventFromCategory', categorieId)
    }
  }
}
</script>

<style lang="scss">
.box-card {
  width: 100%;
  margin-bottom: 1.25rem;
  .wrap {
    display: flex;
    flex-wrap: wrap;
  }
}
.el-submenu__title:hover {
  background-color: rgba($color: #2b2c28, $alpha: 0.6);
}
.el-submenu .el-menu-item {
  background-color: rgba($color: #2b2c28, $alpha: 0.6);
}
.category .el-menu .el-submenu__title {
  background-color: rgba($color: #2b2c28, $alpha: 0.6);
  i {
    color: rgb(203, 206, 212);
  }
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: rgba($color: #2b2c28, $alpha: 0.8);
}
</style>
