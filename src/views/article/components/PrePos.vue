<template>
  <div id="article_pre_pos">
    <router-link v-if="article.last" class="post-turning-pre" tag="div" :to="'/subject/article/'+article.last.id">上一篇</router-link>
    <router-link v-if="article.next" class="post-turning-pos" tag="div" :to="'/subject/article/'+article.next.id">下一篇</router-link>
  </div>
</template>

<script>

export default {
  name: 'PrePos',
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
  #article_pre_pos{
    font-size: 15px;
    .post-turning-pre, .post-turning-pos {
      display: inline-block;
      background-color: white;
      box-shadow: 1px 1px 2px rgba(80, 80, 80, .2);
      border-radius: 10px;
      cursor: pointer;
      border: 1px solid rgba(240, 240, 240, .8);
      padding: 5px 8px 5px 8px;
      font-size: 12px;
      color: rgb(86, 104, 114);
    }
    .post-turning-pos{
      float: right;
    }
  }

</style>
