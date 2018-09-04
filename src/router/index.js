import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MSite from 'pages/MSite/MSite'
// import Order from 'pages/Order/Order'
import Profile from 'pages/Profile/Profile'
import Search from 'pages/Search/Search'
import Login from 'pages/Login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: () => import('pages/Order/Order'),
      meta: {
        showFooter: true
      }
      // component: Order
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  linkExactActiveClass: 'on'
})
