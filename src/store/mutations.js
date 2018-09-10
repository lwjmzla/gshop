import * as types from './mutation-types'

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
  }
}

export default mutations
