// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import store from './store'
import '../static/css/common.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('../static/images/loading.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
