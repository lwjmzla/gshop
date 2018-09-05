// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'common/reset.css'

// import $ from 'jquery'
// import slide from '../static/js/slide'
// console.log($('body'))

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: require('common/image/default.png')
  // attempt: 1
})

fastclick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
