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
          <a-icon type="file" />10篇
        </span>
        <span><span class="icon iconfont ios-shijian" />2021-09-05 21:09</span>
      </template>
    </a-card>
  </div>
</template>

<script>

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
  }
}
</script>
