<template>
  <div id="article_pre_pos">
    <div v-if="target==='series'" class="article-series">

      <div class="clearfix article-series-page">
        <div class="article-series-page__line" />
        <div class="article-series-page__wrapper">
          <router-link v-if="getLast" :to="getLastTo()" class="article-series-page__link">
            <div class="article-series-page__content">
              <div class="article-series-page__text">上一篇</div>
              <div class="article-series-page__title">{{ getLast.title }}</div>
            </div>
          </router-link>
        </div>
        <div class="article-series-page__wrapper text-right">
          <router-link v-if="getNext" :to="getNextTo()" class="article-series-page__link">
            <div class="article-series-page__content">
              <div class="article-series-page__text">下一篇</div>
              <div class="article-series-page__title">{{ getNext.title }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="article-series-catalog">
        <div class="article-series-catalog__badge">
          系列文
        </div>
        <div class="article-series-catalog__topic">
          <router-link :to="routerLinkTo()" class="article-series-catalog__topic-link">{{ upperCategory.name }}</router-link>
          共 <span class="article-series-catalog__num">{{ toLength(upperCategory.serieHasArticle.length) }}</span> 篇
        </div>
        <div class="clearfix">
          <div>
            <div class="article-series-catalog__title">目錄</div>

            <!-- <div class="pull-right subscription-group">
              <a href="https://ithelp.ithome.com.tw/rss/series/4018" class="rss-icon" target="_blank">
                <i class="fa fa-rss fa-fw" aria-hidden="true" />RSS系列文
              </a>
              <button
                class="article-series-catalog__subscription active subscription-btn"
                data-type="series"
                data-id="4018"
              >
                <i class="fa fa-bookmark fa-fw" aria-hidden="true" /><span class="subscription-text">已訂閱系列文</span>
              </button>

              <div class="article-series-catalog__subscription-num">
                <span class="subscription-amount">3</span> 人訂閱
              </div>
            </div> -->
          </div>
          <ol class="article-series-catalog__lists">
            <li v-for="item in articleNearby" :key="item.id" class="article-series-catalog__list">
              <div class="article-series-catalog__list-num">{{ item.pivot.page+1 }}</div>
              <router-link :to="articleLinkTo(item.id)" class="article-series-catalog__link">{{ item.title }}
              </router-link>
            </li>
          </ol>
          <router-link :to="routerLinkTo()"><i class="fa fa-fw fa-chevron-circle-right" aria-hidden="true" />完整目錄
          </router-link>
        </div>
      </div>
    </div>
    <div v-else-if="target==='category'" class="article-series">

      <div class="clearfix article-series-page">
        <div class="article-series-page__line" />
        <div class="article-series-page__wrapper">
          <router-link v-if="getLast" :to="getLastTo()" class="article-series-page__link">
            <div class="article-series-page__content">
              <div class="article-series-page__text">上一篇</div>
              <div class="article-series-page__title">{{ getLast.title }}</div>
            </div>
          </router-link>
        </div>
        <div class="article-series-page__wrapper text-right">
          <router-link v-if="getNext" :to="getNextTo()" class="article-series-page__link">
            <div class="article-series-page__content">
              <div class="article-series-page__text">下一篇</div>
              <div class="article-series-page__title">{{ getNext.title }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="article-series-catalog">
        <div class="article-series-catalog__badge">
          分類文
        </div>
        <div class="article-series-catalog__topic">
          <router-link :to="routerLinkTo()" class="article-series-catalog__topic-link">{{ upperCategory.name }}</router-link>
          共 <span class="article-series-catalog__num">{{ toLength(upperCategory.articleTotle) }}</span> 篇
        </div>
        <div class="clearfix">
          <div>
            <div class="article-series-catalog__title">目錄</div>

            <!-- <div class="pull-right subscription-group">
              <a href="https://ithelp.ithome.com.tw/rss/series/4018" class="rss-icon" target="_blank">
                <i class="fa fa-rss fa-fw" aria-hidden="true" />RSS系列文
              </a>
              <button
                class="article-series-catalog__subscription active subscription-btn"
                data-type="series"
                data-id="4018"
              >
                <i class="fa fa-bookmark fa-fw" aria-hidden="true" /><span class="subscription-text">已訂閱系列文</span>
              </button>

              <div class="article-series-catalog__subscription-num">
                <span class="subscription-amount">3</span> 人訂閱
              </div>
            </div> -->
          </div>
          <ol class="article-series-catalog__lists">
            <li v-for="item in articleNearby" :key="item.id" class="article-series-catalog__list">
              <div class="article-series-catalog__list-num">{{ item.id }}</div>
              <router-link :to="articleLinkTo(item.id)" class="article-series-catalog__link">{{ item.title }}
              </router-link>
            </li>
          </ol>
          <router-link :to="routerLinkTo()"><i class="fa fa-fw fa-chevron-circle-right" aria-hidden="true" />完整目錄
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <router-link v-if="getLast" class="post-turning-pre" tag="div" :to="getLastTo()">上一篇
      </router-link>
      <router-link v-if="getNext" class="post-turning-pos" tag="div" :to="getNextTo()">下一篇
      </router-link>
    </div>
  </div>
</template>

<script>
import { toLength } from 'lodash-es'

export default {
  props: {
    article: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    articleNearby: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    target: {
      type: String,
      required: true
    },
    upperCategory: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  computed: {
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
    }
  },
  methods: {
    getLastTo() {
      return this.articleLinkTo(this.getLast.id)
    },

    getNextTo() {
      return this.articleLinkTo(this.getNext.id)
    },
    articleLinkTo(id) {
      return `${this.routerLinkTo()}/article/${id}`
    },
    routerLinkTo() {
      switch (this.target) {
        case 'all':
          return `/subject`
        case 'category':
          return `/subject/category/${this.article.categorieId}`
        case 'series':
          return `/subject/series/${this.article.seriesId}`
      }
    },
    toLength(val) {
      return toLength(val)
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

  $oc-gray-list: (
    "0": #f8f9fa,
    "1": #f1f3f5,
    "2": #e9ecef,
    "3": #dee2e6,
    "4": #ced4da,
    "5": #adb5bd,
    "6": #868e96,
    "7": #495057,
    "8": #343a40,
    "9": #212529
  );

  $oc-gray-0: map-get($oc-gray-list, "0");
  $oc-gray-1: map-get($oc-gray-list, "1");
  $oc-gray-2: map-get($oc-gray-list, "2");
  $oc-gray-3: map-get($oc-gray-list, "3");
  $oc-gray-4: map-get($oc-gray-list, "4");
  $oc-gray-5: map-get($oc-gray-list, "5");
  $oc-gray-6: map-get($oc-gray-list, "6");
  $oc-gray-7: map-get($oc-gray-list, "7");
  $oc-gray-8: map-get($oc-gray-list, "8");
  $oc-gray-9: map-get($oc-gray-list, "9");

  $oc-yellow-list: (
    "0": #fff9db,
    "1": #fff3bf,
    "2": #ffec99,
    "3": #ffe066,
    "4": #ffd43b,
    "5": #fcc419,
    "6": #fab005,
    "7": #f59f00,
    "8": #f08c00,
    "9": #e67700
  );

  $oc-yellow-0: map-get($oc-yellow-list, "0");
  $oc-yellow-1: map-get($oc-yellow-list, "1");
  $oc-yellow-2: map-get($oc-yellow-list, "2");
  $oc-yellow-3: map-get($oc-yellow-list, "3");
  $oc-yellow-4: map-get($oc-yellow-list, "4");
  $oc-yellow-5: map-get($oc-yellow-list, "5");
  $oc-yellow-6: map-get($oc-yellow-list, "6");
  $oc-yellow-7: map-get($oc-yellow-list, "7");
  $oc-yellow-8: map-get($oc-yellow-list, "8");
  $oc-yellow-9: map-get($oc-yellow-list, "9");

  $text-color: #303233;
  $main-color: #00a0e9;

  // 系列文
  .article-series {
    padding: 16px 30px;
    border: 1px solid #e5e5e5;
    background-color: $oc-gray-2;
    &-page {
      position: relative;
      padding-bottom: 10px;
      border-bottom: 1px solid $oc-gray-5;
      &__line {
        position: absolute;
        left: 50%;
        top: 0;
        content: "";
        width: 1px;
        height: calc(100% - 10px);
        background-color: $oc-gray-5;
        transform: translateX(-50%);
      }
      &__wrapper {
        display: inline-block;
        width: 49.5%;
        vertical-align: top;
      }
      &__link {
        display: inline-block;
        &:hover,
        &:focus {
          .article-series-page__arrow {
            color: lighten($oc-gray-6, 5%);
            border-color: lighten($oc-gray-6, 5%);
          }
          .article-series-page__text {
            color: lighten($oc-gray-6, 5%);
          }
          .article-series-page__title {
            color: $main-color;
          }
        }
        &:active {
          .article-series-page__arrow {
            color: darken($oc-gray-6, 5%);
            border-color: darken($oc-gray-6, 5%);
          }
          .article-series-page__text {
            color: darken($oc-gray-6, 5%);
          }
          .article-series-page__title {
            color: darken($main-color, 5%);
          }
        }
      }
      &__arrow {
        display: block;
        width: 30px;
        height: 30px;
        margin-top: 4px;
        text-align: center;
        color: $oc-gray-6;
        border: 1px solid $oc-gray-6;
        border-radius: 100%;
        transition: all 0.2s ease;
        &--left {
          float: left;
          i {
            position: relative;
            left: -1px;
          }
        }
        &--right {
          float: right;
          i {
            position: relative;
            right: -1px;
          }
        }
      }
      &__content {
        overflow: hidden;
        padding: 0 8px;
      }
      &__text {
        color: $oc-gray-6;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.2s ease;
      }
      &__title {
        color: $oc-gray-7;
        transition: all 0.2s ease;
      }
    }
    .text-right {
      text-align: right;
    }
  }

  .article-series-catalog {
    padding-top: 10px;
    &__badge {
      display: inline-block;
      margin-bottom: 8px;
      padding: 2px 8px;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      background-color: $oc-gray-8;
      border-radius: 4px;
    }
    &__topic {
      font-size: 20px;
      color: $oc-gray-7;
      &-link {
        color: $oc-gray-9;
        font-weight: bold;
      }
    }
    &__num {
      color: $oc-gray-9;
    }
    &__title {
      display: inline-block;
      margin-top: 4px;
      margin-bottom: 6px;
      font-weight: bold;
    }
    &__subscription {
      display: inline-block;
      padding: 0 10px;
      margin-right: 8px;
      font-size: 15px;
      color: $oc-yellow-9;
      border: 1px solid $oc-yellow-8;
      border-radius: 16px;
    }
    &__subscription-num {
      display: inline-block;
      color: $oc-gray-6;
    }
    &__lists {
      margin-bottom: 6px;
      padding: 0;
      padding-top: 12px;
      border-top: 1px solid $oc-gray-5;
      list-style: none;
      counter-reset: my-counter;
    }
    &__list {
      position: relative;
      padding-left: 30px;

      &:nth-child(n + 2) {
        margin-top: 10px;
      }
      &-num {
        display: block;
        float: left;
        margin-top: 3px;
        margin-left: -30px;
        height: 22px;
        width: 22px;
        color: #fff;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        border-radius: 50%;
        background-color: $oc-gray-7;
      }
    }
    &__link {
      color: $text-color;
    }
    &__more {
      margin-bottom: 3px;
      padding-left: 45px;
      font-size: 13px;
      color: #7c8689;
    }
  }
}
</style>
