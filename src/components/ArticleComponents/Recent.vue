<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><i class="iconfont icon-wenzhang" /> 最近文章</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="more">more</el-button> -->
    </div>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="ItemList"
      :title="item.title"
      @click="handleToDetail(item.id)"
    >
      <span class="left">
        {{ item.title }}
      </span>
      <span>
        {{ parseTime(item.createdAt,'{y}-{m}-{d}') }}
      </span>
    </div>
  </el-card>
</template>

<script>
import { getArticle } from '@/api/article'
import { parseTime } from '@/utils/index'
export default {
  name: 'Recent',
  data() {
    return {
      // 總文章數
      total: 0,
      // 文章列表
      list: [],
      // 分頁
      pagination: {
        // 每頁數量
        size: 3,
        // 頁數
        page: 1
      },
      // 排序
      order: {
        updatedAt: 'desc'
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  created() {
    this.getRecent()
  },
  methods: {
    // 获取最近文章
    async getRecent() {
      try {
        const params = { pagination: this.pagination, order: this.order }
        const res = await getArticle(params)
        this.list = res.list
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 查看更多
    // more() {

    //   this.showList = this.recentList
    // },
    // 跳转详情页
    handleToDetail(articleId) {
      this.$router.push(`/detail/${articleId}`)
    },
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  }
}
</script>

<style lang='scss' scoped>
.box-card {
    width: 100%;
    margin-bottom: 1.25rem;
    background-color: rgba($color: #f2f2f2, $alpha: 0.6);
    .ItemList {
      padding: 0.8rem 0.5rem;
      cursor: pointer;
      color: #555;
      border-bottom: 1px solid #ccc;
      transition: all 0.6s;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        color: black;
        font-weight: bold;
        white-space: nowrap;
      }
      .left {
        display: block;
        width: 68%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .ItemList:hover {
      background: #f2f2f2;
      color: lightgreen;
      padding-left: 0.8rem;
    }
    .ItemList:last-child {
      border-bottom: none;
    }
}
</style>
