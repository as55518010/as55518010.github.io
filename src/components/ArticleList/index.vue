<template>
  <div>
    <div v-if="list.length >0">
      <div class="article-list-wrap">
        <div v-for="item in list" :key="item.id" class="item-wrap" @click="routerLinkTo(item.id)">
          <div v-if="item.articleDetil.description" class="complex-item">
            <div class="item-img">
              <img :src="item.thumb?item.thumb:'https://picsum.photos/1024'">
            </div>
            <div class="item-body">
              <div class="item-title sing-ellipsis panel-item-title-color" :title="item.title">{{ item.title }}</div>
              <div class="item-desc three-ellipsis" :title="item.articleDetil.description">
                {{ item.articleDetil.description }}</div>
              <div class="item-bottom">
                <div class="item-author">
                  <span class="icon iconfont renyuanguanli" />
                  <span>{{ item.author }}</span>
                </div>
                <div class="item-time">
                  <span class="icon iconfont ios-shijian" />
                  <span>{{ parseTime(item.createdAt,'{y}-{m}-{d}') }}</span>
                </div>
                <div class="item-read">
                  <span class="icon iconfont see" />
                  <span>{{ item.articleDetil.view }}條閱讀</span>
                </div>
                <!-- <div class="item-comment">
                  <span class="icon iconfont talk" />
                  <span>{{ item.articleDetil.view }}條評論</span>
                </div> -->
              </div>
            </div>
          </div>
          <div v-else class="simple-item">
            <div class="simple-item-body">
              <div class="simple-item-title">
                {{ item.title }}
              </div>
              <div class="simple-item-bottom">
                {{ item.author }} {{ parseTime(item.createdAt,'{y}-{m}-{d}') }} 閱讀:{{ item.articleDetil.view }}
                評論:{{ item.articleDetil.view }}
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <a-empty v-else description="此系列暫無文章" />

  </div>
</template>

<script>
import { parseTime } from '@/utils/index'

export default {
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
    }
  },
  methods: {
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    handlePageChange(page) {
      this.$emit('handlePageChange', page)
    },
    routerLinkTo(id) {
      this.$emit('routerLinkTo', id)
    }
  }
}
</script>
