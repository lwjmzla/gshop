import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/Login/Login'
import Shop from 'pages/Shop/Shop'
import ShopGoods from 'pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from 'pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from 'pages/Shop/ShopInfo/ShopInfo'
// import HelloWorld from '@/components/HelloWorld'

// import MSite from 'pages/MSite/MSite'
import linshi from 'pages/MSite/linshi/linshi'
// import Order from 'pages/Order/Order'
// import Profile from 'pages/Profile/Profile'
// import Search from 'pages/Search/Search'
const MSite = () => import('pages/MSite/MSite')
const Order = () => import('pages/Order/Order')
const Search = () => import('pages/Search/Search')
const Profile = () => import('pages/Profile/Profile')

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
      },
      children: [
        {
          path: 'linshi',
          component: linshi
        }
      ]
    },
    {
      path: '/order',
      component: Order,
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
