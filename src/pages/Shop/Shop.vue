<template>
  <div class="shopWrap">
    <shop-header :info="info"></shop-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from 'components/ShopHeader/ShopHeader'
import {getShopInfo, ERR_OK} from 'api/index.js'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      info: {}
    }
  },
  components: {
    ShopHeader
  },
  created () {
    //  可以在这判断 上一个路由点击的时候保存信息，在这里获取那个信息 然后ajax对应的 shop信息就 能对应 不一样的shop
    getShopInfo().then((res) => {
      if (res.code === ERR_OK) {
        this.info = res.data
        this.SET_INFO(this.info)
      }
    })
  },
  methods: {
    ...mapMutations(['SET_INFO'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .shopWrap
    position absolute
    top 0
    left 0
    right 0
    bottom 0
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
