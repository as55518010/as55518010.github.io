<template>
  <div id="menu_items">
    <div v-if="menuTitle" class="menu-items-wrap">
      <div class="menu-item-title">{{ menuTitle }}</div>
      <el-menu :router="router" :default-active="defaultActive" class="menu-items-wrap">
        <MenuTree :menu-list="menuList" :index-prefix="indexPrefix" />
      </el-menu>
    </div>
    <el-menu v-else :router="router" :default-active="defaultActive" class="menu-items-wrap">
      <MenuTree :menu-list="menuList" :index-prefix="indexPrefix" />
    </el-menu>
  </div>
</template>

<script>
import MenuTree from '@/components/MenuTree/index.vue'
/* 菜單*/
export default {
  name: 'MenuItems',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MenuTree
  },
  props: {
    menuTitle: {
      type: String,
      default() {
        return ''
      }
    },
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    indexPrefix: {
      type: String,
      default: ''
    },
    defaultActive: {
      type: String,
      default: ''
    },
    router: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
#menu_items {
  font-size: 0px;

  .menu-items-wrap {
    border-top: 1px solid #e2e8ea;

    .menu-item-title {
      color: #98a6ad;
      font-size: 12px;
      padding: 10px 13px 6px 13px;
      box-sizing: border-box;
    }

    .menu-item-area {
      .item-row {
        width: 100%;
        box-sizing: border-box;

        .children-item-wrap:hover,
        .parent-item-wrap:hover {
          background-color: rgba(150, 150, 150, 0.15);
        }

        .func-radio:not(:checked) {
          + label {
            .arrow-wrap {
              .show-bottom-icon {
                transform: rotate(180deg);
              }
            }

            + .children-wrap {
              height: 0px !important;
            }
          }
        }

        .children-wrap {
          overflow: hidden;
          transition: all 0.2s ease-in-out 0s;

          .children-item-wrap {
            padding: 7px 23px 7px 60px;
            cursor: pointer;
            font-size: 13px;
            position: relative;
            .children-num {
              border-radius: 10px;
              font-size: 10px;
              float: right;
              padding: 1px 0 1px 0;
              width: 25px;
              height: 14px;
              line-height: 14px;
              background-color: #cfdadd;
              color: white;
              text-align: center;
              position: relative;
              right: -4px;
              top: 2px;
              text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
            }
          }
        }

        .parent-item-wrap {
          cursor: pointer;
          padding: 9px 23px 9px 23px;
          line-height: 1.4;
          .icon-wrap {
            padding-right: 19px;
          }

          .arrow-wrap {
            display: inline-block;
            font-size: 8px;
            float: right;
            padding-top: 1px;

            .show-bottom-icon {
              display: inline-block;
              transition: all 0.2s ease-in-out 0s;
            }
          }

          .icon-wrap,
          .title-wrap {
            font-size: 14px;
            display: inline-block;

            .icon {
              font-size: 17px;
              position: relative;
              top: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
