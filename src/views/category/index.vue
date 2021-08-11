<template>
  <div id="category_body">
    <div class="category-body-wrap">
      <div class="head-title">
        <div v-if="title" class="title-font">{{ title }}</div>
        <div v-if="!title" class="title-thumb">'{{ blogTitle }}'</div>
        <div v-if="!title" class="title-sign ">{{ blogSign }}</div>
      </div>
      <div class="article-list-wrap">
        <router-link v-for="item in list" :key="item.id" class="item-wrap" tag="div" :to="'/subject/article/'+item.id">
          <div v-if="item.articleDetil.description" class="complex-item">
            <div class="item-img">
              <img v-if="item.thumb" :src="item.thumb">
              <div v-else class="div-img" :style="getRandomImgClz()" />
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
                <div class="item-comment">
                  <span class="icon iconfont talk" />
                  <span>{{ item.articleDetil.view }}條評論</span>
                </div>
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
        </router-link>
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
  </div>
</template>
<script>
/* 文章列表展示*/
import { getArticle } from '@/api/article'
import { getCategorieDetail } from '@/api/categorie'
import BlogContext from '@/context/BlogContext'
import { parseTime, checkNullObj } from '@/utils/index'

const imgList = Array.from(
  Array(BlogContext.panelItemPic.length - 1),
  (v, k) => k
)
  .sort(() => (Math.random() >= 0.5 ? 1 : -1))
  .map(item => 1 + item)

export default {
  name: 'Category',
  data: () => {
    return {
      // 總文章數
      total: 0,
      // 文章列表
      list: [],
      // 分頁
      pagination: {
        // 每頁數量
        size: 1,
        // 頁數
        page: 1
      },
      // 篩選條件
      where: {},
      title: '',
      articleName: BlogContext.blogName,
      blogTitle: BlogContext.blogName + '博客',
      blogSign: BlogContext.blogSign
    }
  },
  watch: {
    $route() {
      this.initArticle()
    }
  },
  created() {
    this.initArticle()
  },
  methods: {
    getRandomImgClz: () => {
      const imgSrc = imgList.shift()
      imgList.push(imgSrc)
      return {
        background: 'url(' + BlogContext.panelItemPic[imgSrc] + ') no-repeat'
      }
    },
    // 初始化
    async initArticle() {
      this.$baseEventBus.$emit('fullLoadingOpen')
      if (checkNullObj(this.$route.params)) {
        this.where = this.$route.params
        switch (Object.keys(this.$route.params)[0]) {
          case 'categorieId':
            this.categorieDetail(this.$route.params.categorieId)
            break

          default:
            break
        }
      }
      // 獲取文章列表
      await this.articlePage()
      this.$baseEventBus.$emit('fullLoadingClose')
    },
    // 換頁的回調
    handlePageChange(val) {
      this.pagination.page = val
      // 獲取文章列表
      this.articlePage()
    },
    // 獲取文章列表
    async articlePage() {
      try {
        const params = { pagination: this.pagination, where: this.where }
        const res = await getArticle(params)
        this.list = res.list
        this.total = res.pagination.total
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 獲取單個類別區塊
    async categorieDetail(id) {
      try {
        const { result } = await getCategorieDetail(id)
        this.title = `文章分類 - ${result.name}`
      } catch (error) {
        this.$message.error(error)
      }
    },
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  }
}
</script>

<style lang="scss">
#category_body {
  .pagination {
    text-align: center;
  }
  .category-body-wrap {
    padding-bottom: 10px;
    height: 100%;
    font-size: 0;
    border-right: 1px solid #e2e8ea;
    box-sizing: border-box;
    background-color: #f6f8f9;
    .article-list-wrap {
      padding-top: 20px;
      .item-wrap:last-of-type {
      }
      .item-wrap {
        background-color: #fcfeff;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 0px 20px 20px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        .complex-item {
          .item-body {
            line-height: 1.5;
            height: 175px;
            box-sizing: border-box;
            padding: 20px 15px 15px 20px;
            display: inline-block;
            vertical-align: top;
            position: relative;
            @include categoryBodyCalWidth();
            @include deve1() {
              padding: 3px 10px 5px 12px;
              height: 100px;
            }

            .item-title {
              font-size: 22px;
              margin-bottom: 10px;
              cursor: pointer;
              @include deve1() {
                margin-bottom: 2px;
                font-size: 20px;
              }
            }

            .item-desc {
              line-height: 25px;
              font-size: 14px;
              color: #a2b0b7;
              cursor: pointer;
              @include deve1() {
                -webkit-line-clamp: 2;
                font-size: 13px;
                line-height: 20px;
              }
            }

            .item-bottom {
              border-top: 1px solid #dee5e7;
              box-sizing: border-box;
              position: absolute;
              padding-top: 5px;
              bottom: 6px;
              left: 20px;
              right: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: inline-block;
              @include deve1() {
                padding-top: 1px;
                bottom: -2px;
                text-align: left;
              }
              .item-time,
              .item-read,
              .item-comment {
                padding-left: 12px;
              }

              .item-author,
              .item-time,
              .item-read,
              .item-comment {
                cursor: pointer;
                color: #a2b0b7;
                display: inline-block;
                font-size: 12px;

                .icon {
                  font-size: 10px;
                }
              }
            }
          }
          .item-img {
            display: inline-block;
            vertical-align: top;

            .div-img,
            img {
              width: 250px;
              @include itemBodyHeight();
              border-radius: 5px 0 0 5px;
              transform: translateY(-0.5px) translateX(1px);
              padding-top: 0.5px;
              box-sizing: border-box;
              cursor: pointer;
              background-size: 100% 100%;
              @include categoryImgWidth();
            }
          }
        }
        .simple-item {
          .simple-item-body {
            padding: 25px;
            .simple-item-title {
              color: #323232;
              cursor: pointer;
              font-size: 23px;
              font-weight: 600;
            }

            .simple-item-bottom {
              cursor: pointer;
              margin-top: 14px;
              font-size: 14px;
              color: #97979f;
            }
          }
        }
      }
    }

    .head-title {
      display: inline-block;
      width: 100%;
      padding: 11px 15px 9px 20px;
      border-bottom: 1px solid #e2e8ea;
      box-sizing: border-box;
      background-color: white;
      height: 55px;
      .title-font {
        display: inline-block;
        font-size: 22px;
        font-weight: 500;
        color: black;
        padding: 0px 0 6px 0;
      }
      .title-thumb {
        display: inline-block;
        font-size: 23px;
        color: black;
      }

      .title-sign {
        margin-left: 10px;
        display: inline-block;
        color: #98a6ad;
        font-size: 12px;
        max-width: 65%;
      }
    }
  }
}
</style>
