<template>
  <div class="footer_guide border-1px">
    <router-link to="/msite" class="guide_item" tag="div">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </router-link>
    <router-link to="/search" class="guide_item" tag="div">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link to="/order" class="guide_item" tag="div">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </router-link>
    <router-link to="/profile" class="guide_item" tag="div">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  created () {
    // function aaa () {
    //   return new Promise((resolve, reject) => {
    //     resolve(100)
    //   })
    // }
    // function bbb () {
    //   return new Promise((resolve, reject) => {
    //     resolve(200)
    //   })
    // }
    // aaa()
    //   .then((res) => {
    //     console.log(res)
    //     return bbb()
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     return '字符串'
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
