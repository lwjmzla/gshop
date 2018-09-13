import * as types from './mutation-types'
import Vue from 'vue'

const mutations = {
  [types.SET_ADDRESS] (state, address) {
    state.address = address
  },
  [types.SET_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [types.SET_SHOPS] (state, shops) {
    state.shops = shops
  },
  [types.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_CARTFOODS] (state, cartFoods) {
    state.cartFoods = cartFoods
  },
  [types.ADD_COUNT] (state, food) {
    if (!food.count) {
      Vue.set(food, 'count', 1) // 这一种新增方式 可以影响 Vue源数据 如果直接 food.count = 1 就没卵用
      state.cartFoods.push(food) // 感觉这样不行。。。数据的传递 还是vuex有前途。。。购物车这种，明天重写。
    } else {
      food.count++
    }
  },
  [types.REDUCE_COUNT] (state, food) {
    if (food.count === 1) {
      const index = state.cartFoods.indexOf(food)
      state.cartFoods.splice(index, 1)
    }
    food.count--
  },
  [types.SET_INFO] (state, info) {
    state.info = info
  }
}

export default mutations
