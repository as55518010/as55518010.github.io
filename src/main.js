import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

import Vab from '@/utils/vab'

import './assets/icon/iconfont.css'
import './assets/css/reset.css'

Vue.use(Vab)

Vue.use(ElementUI, { locale })

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
