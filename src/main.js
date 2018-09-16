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
import {Button} from 'mint-ui'
import 'mock/mockServer.js' // 到时还要弄个DEV的时候才加载，生产模式 就不要。就真实数据  接口参数 也要看具体情况的处理

Vue.component(Button.name, Button) // <mt-button></mt-button>

// import $ from 'jquery'
// import slide from '../static/js/slide'
// console.log($('body'))

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('common/imgs/loading-big.gif')
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
