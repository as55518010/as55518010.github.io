import Vue from 'vue'
import VueRouter from 'vue-router'
import { publicPath, routerMode } from '@/config'
import Layout from '@/layouts'
import HomeBody from '@/views/home/index.vue'
import CategoryBody from '@/views/category/index.vue'
import SeriesBody from '@/views/series/index.vue'
import CategoryArticleBody from '@/views/categoryArticle/index.vue'
import SeriesArticleBody from '@/views/seriesArticle/index.vue'
import ArticleBody from '@/views/article/index.vue'
import SubjectBody from '@/layouts/components/subjectBody/index.vue'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/subject/home',
    children: [
      {
        path: 'subject',
        name: 'SubjectBody',
        component: SubjectBody,
        redirect: '/subject/home',
        children: [
          { path: 'home', component: HomeBody },
          { path: 'category/:categorieId', component: CategoryBody },
          {
            path: 'category/:categoryId/article/:articleId',
            component: CategoryArticleBody
          },
          { path: 'series/:serieId', component: SeriesBody },
          {
            path: 'series/:serieId/article/:articleId',
            component: SeriesArticleBody
          },
          { path: 'article/:articleId', component: ArticleBody }
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
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  routes: constantRoutes
})
export default router
