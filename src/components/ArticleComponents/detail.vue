<template>
  <div id="detail">
    <!-- 標題 -->
    <header class="detail_header" :style="{color: Color}">
      <h1 style="font-size:1.6rem">
        <i class="iconfont icon-lianjie" />
        {{ detail.title }}
      </h1>
      <!-- 時間 -->
      <h3 style="padding-top:1rem;">
        <p>作者：{{ detail.author }} {{ parseTime(detail.createdAt,'{y}-{m}-{d} {h}:{i}') }}發布</p>
        <p>於{{ parseTime(detail.updatedAt,'{y}-{m}-{d} {h}:{i}') }}更新</p>
      </h3>
    </header>
    <!-- 內容區 -->
    <div class="content">
      <markdown ref="md" :toolbars-flag="false" :subfield="false" :default-open="'preview'" />
      <replyOrpublish
        :message-data="messageList"
        publish-u-r-l="/article/leaveMessage"
        reply-u-r-l="/article/messageReply"
      />
    </div>
  </div>
</template>

<script>
import markdown from '@/views/Admin/markdownEdit'
import replyOrpublish from '../ReplyOrPublish/ReplyOrPublish'
import { getArticleDetail } from '@/api/article'
import { parseTime } from '@/utils/index'
export default {
  name: 'Detail',
  components: {
    markdown,
    replyOrpublish
  },
  data() {
    return {
      // 文章對象
      detail: {},
      // 留言回覆
      messageList: [],
      // 頁數
      page: 1,
      // 每頁數量
      pageSize: 5,
      // 總數量
      count: 0,
      bgColor: ['magenta', 'blue', 'red', 'cyan', 'volcano', 'yellow'],
      // 轉化後的html代碼
      html: ''
    }
  },
  computed: {
    Color() {
      return this.$store.state.Color
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.getDetail()
      }
    }
  },
  mounted() {
    // console.log(this.$route.params)
    if (this.$route.params.id) {
      this.getDetail()
    }
    // this.getArticleMessage()
  },
  methods: {
    /* 獲取文章詳情 */
    async getDetail() {
      const { data } = await getArticleDetail(this.$route.params.id)
      this.detail = data
      // this.messageList = res.message.data
      this.$refs.md.content = this.detail.content
    },
    /* 獲取文章留言 */
    async getArticleMessage() {
      const res = await this.$api.getArticleMessage({
        articleId: this.$route.params.id,
        page: this.page,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.messageList = res.data.data
      } else {
        // this.$message.error(res);
      }
      // console.log(res)
    },
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  }
}
</script>

<style lang='scss'>
#detail {
    // padding-left: 24rem;
    // padding-right: 24rem;
    .detail_header {
        padding-left: 25px;
        padding-top: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 23px;
        h1{
            width: 100%;
            text-align: left;
            display: block;
        }
        h3{
            width: 100%;
            text-align: left;
            display: block;
            margin-bottom: 1rem;
        }
        .tags {
        margin-top: 0.5rem;
        }
    }
    .content{
        .article-box{
            border: 1px solid #2d8cf0;
            border-radius: 5px;
            min-height: 180px;
            margin-bottom: 40px;
            padding: 2rem;
        }
    }
}
@media screen and(max-width:992px) {
    #detail{
        .detail_header{
            height: 10rem;
        }
        .content{
            // padding: 0 1rem;
            .article-box{
                padding: 1rem;
            }
        }
    }
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html{
    background: rgba($color: #edeeea, $alpha: 0.6);
}
</style>
