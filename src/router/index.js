import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MSite from 'pages/MSite/MSite'
// import Order from 'pages/Order/Order'
import Profile from 'pages/Profile/Profile'
import Search from 'pages/Search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: MSite
    },
    {
      path: '/order',
      component: () => import('pages/Order/Order')
      // component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  linkExactActiveClass: 'on'
})
