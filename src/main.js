import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 全局filter

import '@/icons'; // icon
import '@/permission' // permission control

import './mock'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  // error: './assets/error.png',
  // loading: './assets/loading.png'
})

Vue.use(ElementUI, { locale })

// register global utility filters.

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
