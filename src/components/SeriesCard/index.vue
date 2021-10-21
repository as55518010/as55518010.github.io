<template>
  <div>
    <a-card :title="showTitle?data.name:false">
      <router-link v-if="showMore" slot="extra" :to="`/subject/series/${data.id}`">more</router-link>
      <div v-html="data.description" />
      <template slot="actions" class="ant-card-actions">
        <span>
          <a-icon type="user" />Derrick
        </span>
        <span>
          <a-icon type="file" />{{ toLength(data.serieHasArticle.length) }}篇
        </span>
        <span><span class="icon iconfont ios-shijian" />{{ parseTime(data.updatedAt,'{y}-{m}-{d} {h}:{m}') }}</span>
      </template>
    </a-card>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { toLength } from 'lodash-es'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    showMore: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    toLength(val) {
      return toLength(val)
    }
  }
}
</script>
