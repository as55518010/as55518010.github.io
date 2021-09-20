<template>
  <div>
    <div v-if="list.length >0">
      <a-card v-for="item in list" :key="item.id">
        <SeriesCard :data="item" />
      </a-card>
      <el-pagination
        class="pagination"
        background
        layout="total, prev, pager, next"
        :current-page="pagination.page"
        :page-size="pagination.size"
        :total="total"
        @current-change="handlePageChange"
      />
    </div>
    <a-empty v-else description="此分類暫無文章系列" />

  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import SeriesCard from '@/components/SeriesCard'

export default {
  components: {
    SeriesCard
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    }
  },
  methods: {
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    handlePageChange(page) {
      this.$emit('handlePageChange', page)
    }
  }
}
</script>
