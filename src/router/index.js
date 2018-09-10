import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MSite from 'pages/MSite/MSite'
// import Order from 'pages/Order/Order'
import Profile from 'pages/Profile/Profile'
import Search from 'pages/Search/Search'
import Login from 'pages/Login/Login'
import Shop from 'pages/Shop/Shop'
import ShopGoods from 'pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from 'pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from 'pages/Shop/ShopInfo/ShopInfo'

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
      path: '/shop',
      component: Shop,
      children: [
        {
          path: 'goods',
          component: ShopGoods
        },
        {
          path: 'ratings',
          component: ShopRatings
        },
        {
          path: 'info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ],
  linkExactActiveClass: 'on'
})
