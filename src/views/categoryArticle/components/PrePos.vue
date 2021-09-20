<template>
  <div id="article_pre_pos">
    <router-link v-if="getLast()" class="post-turning-pre" tag="div" :to="getLastTo()">上一篇
    </router-link>
    <router-link v-if="getNext()" class="post-turning-pos" tag="div" :to="getNextTo()">下一篇
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PrePos',
  props: {
    article: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    target: {
      type: String,
      required: true
    }
  },
  methods: {
    getLast() {
      switch (this.target) {
        case 'all':
          return this.article.last
        case 'category':
          return this.article.categorieLast
        case 'series':
          return this.article.serieLast
      }
      return false
    },
    getLastTo() {
      switch (this.target) {
        case 'all':
          return `/subject/article/${this.getLast()['id']}`
        case 'category':
          return `/subject/category/${this.getLast()['categorieId']}/article/${
            this.getLast()['id']
          }`
        case 'series':
          return `/subject/article/${this.getLast()['id']}`
      }
      return false
    },
    getNext() {
      switch (this.target) {
        case 'all':
          return this.article.next
        case 'category':
          return this.article.categorieNext
        case 'series':
          return this.article.serieNext
      }
      return false
    },
    getNextTo() {
      switch (this.target) {
        case 'all':
          return `/subject/article/${this.getNext()['id']}`
        case 'category':
          return `/subject/category/${this.getNext()['categorieId']}/article/${
            this.getNext()['id']
          }`
        case 'series':
          return this.article.serieNext
      }
      return false
    }
  }
}
</script>

<style lang="scss">
#article_pre_pos {
  font-size: 15px;
  .post-turning-pre,
  .post-turning-pos {
    display: inline-block;
    background-color: white;
    box-shadow: 1px 1px 2px rgba(80, 80, 80, 0.2);
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid rgba(240, 240, 240, 0.8);
    padding: 5px 8px 5px 8px;
    font-size: 12px;
    color: rgb(86, 104, 114);
  }
  .post-turning-pos {
    float: right;
  }
}
</style>
