<template>
  <div id="left">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3><i class="iconfont icon-wenzhang" />文章列表</h3>
        <h3 style="float:right">共{{ total }}篇</h3>
      </div>
      <div v-for="(item) in list" :key="item.id" class="content">
        <div class="img">
          <img :src="item.thumb" alt="圖片" @click="detailPage(item.id)">
        </div>
        <div class="text">
          <h2 class="title"><i class="iconfont icon-biezhen" /> <router-link :to="`/detail/${item.id}`">{{ item.title }}</router-link></h2>
          <p class="desc"><span style="font-size:16px;font-weight:bold">文章簡介：</span>{{ item.articleDetil.description }}
          </p>
          <div class="text-bottom">
            <div class="creater">
              <div class="img">
                <img src="http://blog.heartless.top:3000/public/images/photos/20210402/1617330367769.jpg" alt="">
              </div>
              <span class="name"><i class="el-icon-user" />{{ item.author }}</span>
              <span class="time"><i class="el-icon-time" />{{ parseTime(item.createdAt,'{y}-{m}-{d}') }}</span>
              <!-- <span @click="changeLike(item.like_Star, item.id, index)"><i class="iconfont icon-dianzan"></i>{{item.like_Star}}</span> -->
              <!-- <span><i class="iconfont icon-pinglun" />{{ item.replytotal }} 條評論</span> -->
              <span><i class="el-icon-view" />{{ item.articleDetil.view }}</span>
            </div>
            <div class="tag">
              <el-tag><i class="iconfont icon-biaoqian" style="font-size:.8rem;margin-right:.5rem;" />{{ item.articleDetil.tag }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="paginationWrap">
        <!-- <span>共 {{total}} 篇</span> -->
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

    </el-card>
  </div>
</template>

<script>

import { getArticle } from '@/api/article'
import { parseTime, checkNullObj } from '@/utils/index'

export default {
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
      // 篩選條件
      where: {},
      // 點贊數量數組
      likes: [],
      // 標識是否為Category組件傳來的
      isCategory: false,
      // 標識是否為Tag組件傳來的
      isTag: false
    }
  },
  created() {
    if (checkNullObj(this.$route.params)) {
      this.where = this.$route.params
    }
    this.PageChange()
    this.baseEventBus()
  },
  beforeUpdate() {
    this.$baseEventBus.$on('eventFromTag', val => {
      // console.log(val)
      this.list = val.list || []
      this.total = val.total
      this.page = val.page
      this.isCategory = false
      this.isTag = true
      // this.pageSize = val.length
    })
    this.$baseEventBus.$on('eventFromSearch', val => {
      this.list = val.list || []
      this.total = val.total
    })
  },
  methods: {
    baseEventBus() {
      this.$baseEventBus.$on('eventFromCategory', categorieId => {
        if (categorieId) {
          this.where = { categorieId }
        } else {
          this.where = {}
        }
        this.PageChange()
      })
    },
    // 跳轉詳情頁
    detailPage(articleId) {
      this.$router.push(`/detail/${articleId}`)
    },
    // 換頁的回調
    handlePageChange(val) {
      this.pagination.page = val
      // console.log(val)
      if (this.isCategory) {
        // console.log('cate')
        this.emitToCategory()
      } else if (this.isTag) {
        // console.log('tag')
        this.emitToTag()
      } else {
        this.PageChange()
      }
    },
    // 獲取文章列表
    async PageChange() {
      try {
        const params = { pagination: this.pagination, where: this.where }
        const res = await getArticle(params)
        console.log(res)
        this.list = res.list
        this.total = res.pagination.total
        // this.list.map((item) => {
        //   this.likes.push(item.like_Star)
        // })
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 點贊
    async changeLike(like_Star, id, index) {
      try {
        if (localStorage.getItem('token')) {
          if (localStorage.getItem(`like${id}`)) {
            this.$message.error('你已經為這篇文章點過贊了噢~o(*￣▽￣*)o')
          } else {
            localStorage.setItem(`like${id}`, id)
            this.list.forEach(async item => {
              if (item.id === id) {
                item.like_Star += 1
                const res = await this.$api.getLike({
                  likestar: item.like_Star,
                  id: id
                })
                if (res.err === 0) {
                  this.$message.success(
                    '你為這篇文章增加了一個star謝謝你的支持鴨！(●ˇ∀ˇ●)'
                  )
                } else {
                  this.$message.error(
                    '網絡好像有點差勁呢！小主稍後再來咱們不急！(ノへ￣、)'
                  )
                }
              }
            })
          }
        } else {
          this.$message.error('請先去登陸再來點贊噢小主！(ノへ￣、)')
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 傳頁數到分類組件
    async emitToCategory(page, pageSize) {
      this.$baseEventBus.$emit('eventToCategory', {
        page: this.page,
        pageSize: this.pageSize
      })
    },
    // 傳頁數到標籤組件
    async emitToTag(page, pageSize) {
      this.$baseEventBus.$emit('eventToTag', {
        page: this.page,
        pageSize: this.pageSize
      })
    },
    // 傳頁數到搜索組件
    async emitToSearch(page, pageSize) {},
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  }
}
</script>

<style lang='scss' scoped>
#left {
  // width: 100%;
  .box-card {
    width: 100%;
    background-color: rgba($color: #f2f2f2, $alpha: 0.6);
    h3 {
      display: inline;
    }
    .content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid #f3f3f3;
      margin-bottom: 1.25rem;
      .img {
        width: 15.625rem;
        margin-right: 1.875rem;
        border-radius: 0.5rem;
        overflow: hidden;
        cursor: pointer;
        // transition: all 1s;
        :hover {
          transition: all 0.3s;
          position: relative;
          top: -0.1875rem;
          left: -0.09375rem;
          box-shadow: 0rem 5px 10px 3px #ccc;
        }
        img {
          width: 100%;
        }
      }
      .text {
        width: 32rem;
        min-height: 14rem;
        position: relative;
        a{
          color: #337ab7;
          text-decoration: none;
        }
        .title {
          display: block;
          margin-bottom: 1.25rem;
        }
        .desc {
          height: 6.25rem;
          font-size: 16px;
        }
        .text-bottom {
          width: 100%;
          position: absolute;
          bottom: 0;
          .creater {
            margin-bottom: 1rem;
            display: flex;
            // justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            font-size: 14px;
            i {
              margin-right: 8px;
            }
            span {
              font-size: 16px;
              font-weight: bold;
              margin-left: 0.5rem;
              margin-right: 0.5rem;
            }
            .img {
              // display: block;
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .time {
              display: block;
              // flex: 1;
              // width: 13.5rem;
            }
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      .content {
        .img {
          width: 100%;
          margin-right: 0;
          margin: 0.8rem;
        }
        .text {
          .text-bottom {
            position: relative;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #left {
    width: 100%;
    // margin: 1rem 0;
  }
}
.paginationWrap {
  .pagination {
    float: right;
    margin-bottom: 1rem;
  }
}
</style>
