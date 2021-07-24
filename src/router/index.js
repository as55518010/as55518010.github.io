import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/article'
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/Web/Article.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/components/ArticleComponents/detail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Web/Login.vue')
  },
  {
    path: '/logined',
    name: 'logined',
    component: () => import('@/components/LoginComponents/Logined.vue')
  },
  {
    path: '/photos',
    name: 'photos',
    component: () => import('@/views/Web/Photos.vue')
  },
  {
    path: '/photoDetail/:id',
    name: 'photoDetail',
    component: () => import('@/components/PhotoComponents/detail.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Web/Profile.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/Web/LeaveMessage.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/Web/Demo.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/Web/Category.vue')
  },
  {
    path: '/admin',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'adminlogin',
    component: () => import('@/views/Admin/adminLogin.vue')
  },
  {
    path: '/admin/article',
    name: 'admin',
    component: () => import('@/views/Admin/articleEditor.vue'),
    redirect: '/admin/article/upload/articleManage',
    children: [
      {
        path: '/admin/article/upload/demo',
        name: 'sendDemo',
        component: () => import('@/views/Admin/sendDemo.vue')
      },
      {
        path: '/admin/article/upload/photos',
        name: 'uploadphoto',
        component: () => import('@/views/Admin/sendcontent.vue')
      },
      {
        path: '/admin/article/upload/images',
        name: 'images',
        component: () => import('@/views/Admin/ImageUpload.vue')
      },
      {
        path: '/admin/article/upload/articlePublish',
        name: 'articlePublish',
        component: () => import('@/views/Admin/articlePublish.vue')
      },
      {
        path: '/admin/article/upload/articleManage',
        name: 'articleManage',
        component: () => import('@/views/Admin/articleManage.vue')
      },
      {
        path: '/admin/article/upload/users',
        name: 'UserManage',
        component: () => import('@/views/Admin/UserManage.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
