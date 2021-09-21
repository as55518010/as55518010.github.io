import Vue from 'vue'
import VueRouter from 'vue-router'
import { publicPath, routerMode } from '@/config'
import store from '@/store/index'
import Layout from '@/layouts'
import CategoryBody from '@/views/category/index.vue'
import SeriesBody from '@/views/series/index.vue'
import CategoryArticleBody from '@/views/categoryArticle/index.vue'
import SeriesArticleBody from '@/views/seriesArticle/index.vue'
import SubjectBody from '@/layouts/components/body/SubjectBody'
// import BlogAuthorBody from '@/components/body/author/BlogAuthorBody'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'subject',
        name: 'SubjectBody',
        component: SubjectBody,
        children: [
          { path: 'category/:categorieId', component: CategoryBody },
          { path: 'category/:categoryId/article/:articleId', component: CategoryArticleBody },
          { path: 'series/:serieId', component: SeriesBody },
          { path: 'series/:serieId/article/:articleId', component: SeriesArticleBody }
          // { path: 'archive/:archiveYear/:archiveMonth', component: CategoryBody },
          // { path: 'tag/:tagId/', component: CategoryBody },
          // { path: 'p/:articleId', component: ArticleBody }
        ]
      }
      // {
      //   path: 'author',
      //   name: 'AuthorBody',
      //   component: BlogAuthorBody
      // }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
// export const constantRoutes = [
//   {
//     path: '/',
//     redirect: '/article'
//   },
//   {
//     path: '/article',
//     name: 'article',
//     component: () => import('@/views/Web/Article.vue')
//   },
//   {
//     path: '/article/:categorieId',
//     name: 'article',
//     component: () => import('@/views/Web/Article.vue')
//   },
//   {
//     path: '/detail/:id',
//     name: 'detail',
//     component: () => import('@/components/ArticleComponents/detail.vue')
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('@/views/Web/Login.vue')
//   },
//   {
//     path: '/logined',
//     name: 'logined',
//     component: () => import('@/components/LoginComponents/Logined.vue')
//   },
//   {
//     path: '/photos',
//     name: 'photos',
//     component: () => import('@/views/Web/Photos.vue')
//   },
//   {
//     path: '/photoDetail/:id',
//     name: 'photoDetail',
//     component: () => import('@/components/PhotoComponents/detail.vue')
//   },
//   {
//     path: '/profile',
//     name: 'profile',
//     component: () => import('@/views/Web/Profile.vue')
//   },
//   {
//     path: '/message',
//     name: 'message',
//     component: () => import('@/views/Web/LeaveMessage.vue')
//   },
//   {
//     path: '/demo',
//     name: 'demo',
//     component: () => import('@/views/Web/Demo.vue')
//   },
//   {
//     path: '/category',
//     name: 'category',
//     component: () => import('@/views/Web/Category.vue')
//   },
//   {
//     path: '/admin',
//     redirect: '/admin/login'
//   },
//   {
//     path: '/admin/login',
//     name: 'adminlogin',
//     component: () => import('@/views/Admin/adminLogin.vue')
//   },
//   {
//     path: '/admin/article',
//     name: 'admin',
//     component: () => import('@/views/Admin/articleEditor.vue'),
//     redirect: '/admin/article/upload/articleManage',
//     children: [
//       {
//         path: '/admin/article/upload/demo',
//         name: 'sendDemo',
//         component: () => import('@/views/Admin/sendDemo.vue')
//       },
//       {
//         path: '/admin/article/upload/photos',
//         name: 'uploadphoto',
//         component: () => import('@/views/Admin/sendcontent.vue')
//       },
//       {
//         path: '/admin/article/upload/images',
//         name: 'images',
//         component: () => import('@/views/Admin/ImageUpload.vue')
//       },
//       {
//         path: '/admin/article/upload/articlePublish',
//         name: 'articlePublish',
//         component: () => import('@/views/Admin/articlePublish.vue')
//       },
//       {
//         path: '/admin/article/upload/articleManage',
//         name: 'articleManage',
//         component: () => import('@/views/Admin/articleManage.vue')
//       },
//       {
//         path: '/admin/article/upload/users',
//         name: 'UserManage',
//         component: () => import('@/views/Admin/UserManage.vue')
//       }
//     ]
//   },
//   {
//     path: '/404',
//     component: () => import('@/views/404'),
//     hidden: true
//   },

//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

// export const asyncRoutes = [
//   {
//     path: '/',
//     redirect: '/article',
//     meta: {
//       title: '首頁',
//       icon: 'home',
//       affix: true
//     }
//   },
//   {
//     path: '/article',
//     name: 'article',
//     component: () => import('@/views/Web/Article.vue'),
//     meta: {
//       title: '首頁',
//       icon: 'home',
//       affix: true
//     }
//   },
//   {
//     path: '/detail/:id',
//     name: 'detail',
//     component: () => import('@/components/ArticleComponents/detail.vue')
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('@/views/Web/Login.vue')
//   },
//   {
//     path: '/logined',
//     name: 'logined',
//     component: () => import('@/components/LoginComponents/Logined.vue')
//   },
//   {
//     path: '/photos',
//     name: 'photos',
//     component: () => import('@/views/Web/Photos.vue')
//   },
//   {
//     path: '/photoDetail/:id',
//     name: 'photoDetail',
//     component: () => import('@/components/PhotoComponents/detail.vue')
//   },
//   {
//     path: '/profile',
//     name: 'profile',
//     component: () => import('@/views/Web/Profile.vue')
//   },
//   {
//     path: '/message',
//     name: 'message',
//     component: () => import('@/views/Web/LeaveMessage.vue')
//   },
//   {
//     path: '/demo',
//     name: 'demo',
//     component: () => import('@/views/Web/Demo.vue')
//   },
//   {
//     path: '/category',
//     name: 'category',
//     component: () => import('@/views/Web/Category.vue')
//   },
//   {
//     path: '/admin',
//     redirect: '/admin/login'
//   },
//   {
//     path: '/admin/login',
//     name: 'adminlogin',
//     component: () => import('@/views/Admin/adminLogin.vue')
//   },
//   {
//     path: '/admin/article',
//     name: 'admin',
//     component: () => import('@/views/Admin/articleEditor.vue'),
//     redirect: '/admin/article/upload/articleManage',
//     children: [
//       {
//         path: '/admin/article/upload/demo',
//         name: 'sendDemo',
//         component: () => import('@/views/Admin/sendDemo.vue')
//       },
//       {
//         path: '/admin/article/upload/photos',
//         name: 'uploadphoto',
//         component: () => import('@/views/Admin/sendcontent.vue')
//       },
//       {
//         path: '/admin/article/upload/images',
//         name: 'images',
//         component: () => import('@/views/Admin/ImageUpload.vue')
//       },
//       {
//         path: '/admin/article/upload/articlePublish',
//         name: 'articlePublish',
//         component: () => import('@/views/Admin/articlePublish.vue')
//       },
//       {
//         path: '/admin/article/upload/articleManage',
//         name: 'articleManage',
//         component: () => import('@/views/Admin/articleManage.vue')
//       },
//       {
//         path: '/admin/article/upload/users',
//         name: 'UserManage',
//         component: () => import('@/views/Admin/UserManage.vue')
//       }
//     ]
//   }
// ]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

export function resetRouter() {
  location.reload()
}
/* 重定向不報錯 */
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

/* 全局導航守衛 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (localStorage.getItem('token')) {
      router.replace({ name: 'logined' })
    }
  }
  next()
})
/* 管理系統守衛 */
router.beforeEach(async(to, from, next) => {
  if (to.path.includes('/admin/article')) {
    const accessToken = store.getters['user/accessToken']
    if (accessToken) {
      // console.log(next)
      next()
    } else {
      router.push({ name: 'adminlogin' })
    }
  }
  next()
})
// 以登陸狀態
router.beforeEach(async(to, from, next) => {
  if (to.path.includes('/admin/login')) {
    const accessToken = store.getters['user/accessToken']
    if (accessToken) {
      router.push({ name: 'articleEditor' })
    } else {
      router.push({ name: 'adminlogin' })
    }
    // getnotedetail('/user/adminIslogined').then(res => {
    //   if (res.data.err === 0) {
    //     router.push({ name: 'admin' })
    //   } else {
    //     router.push({ name: 'adminlogin' })
    //   }
    // })
  }
  next()
})
export default router
