<template>
  <div id="article_pre_line">
    <div class="post-body-head post-body-title">
      <a-breadcrumb style="display:inline;">
        <a-breadcrumb-item v-for="(item,key) in data" :key="key">{{ item.name }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
  #article_pre_line{
    font-size: 12px;
    .post-body-title {
      color: rgb(88, 102, 110);
      padding: 8px 15px 6px 15px;
      margin: 10px 15px 0px 15px;
      background-color: white;
      font-size: 14px;
      border: 1px solid rgb(238, 238, 238);
      box-sizing: border-box;
      border-radius: 5px;

      span {
        cursor: pointer;
      }

      .right-area {
        float: right;

        .weibo {
          margin-left: 8px;
          margin-right: 4px;
        }
      }

      .sep {
        font-size: 13px;
        color: #ccc;
        margin-left: 2px;
        margin-right: 2px;
      }

      span {
        vertical-align: top;
      }

      .home {
        margin-right: 2px;
      }
    }
  }
</style>
