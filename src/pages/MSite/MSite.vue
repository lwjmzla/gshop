<template>
  <section class="msite">
    <!--首页头部-->
    <header-top :title="title">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </header-top>
    <div class="betterScrollWrap">
      <div class="betterScrollContent">
        <!--首页导航-->
        <nav class="msite_nav">
          <img :src="load" v-if="!categorys.length" />
          <swiper :options="swiperOption" v-if="categorys.length" >
            <swiper-slide v-for="(page,index) in categorys" :key="index">
              <a href="javascript:" class="link_to_food" v-for="category in page" :key="category.id">
                <div class="food_container">
                  <img :src="baseImageUrl + category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <shop-list :shops="shops"></shop-list>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import HeaderTop from 'components/HeaderTop/HeaderTop'
import ShopList from 'components/ShopList/ShopList'
import {getAddress, getFoodCategorys, getShops, ERR_OK} from 'api/index'
import {mapGetters} from 'vuex'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      title: '',
      baseImageUrl: 'https://fuss10.elemecdn.com',
      categorys: [],
      shops: [],
      load: require('./images/msite_back.svg')
    }
  },
  components: {
    HeaderTop,
    swiper,
    swiperSlide,
    ShopList
  },
  created () {
    const geohash = this.latitude + ',' + this.longitude
    getAddress(geohash).then((res) => {
      if (res.code === ERR_OK) {
        this.title = res.data.name
      }
    })
    getFoodCategorys().then((res) => {
      if (res.code === ERR_OK) {
        this.categorys = this._calculateCategorys(res.data)
      }
    })
    getShops(this.latitude, this.longitude).then((res) => {
      if (res.code === ERR_OK) {
        this.shops = res.data
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll('.betterScrollWrap', {
        click: true
      })
    })
  },
  computed: {
    ...mapGetters(['latitude', 'longitude', 'userInfo'])
  },
  methods: {
    _calculateCategorys (data) {
      const swiperPages = Math.floor(data.length / 8)
      let bigArr = []
      let smallArr = []
      for (let i = 0; i < swiperPages; i++) {
        smallArr = data.slice(i * 8, (i + 1) * 8)
        bigArr.push(smallArr)
      }
      return bigArr
    }
  },
  watch: {
    shops (nevVal) {
      // setTimeout(() => {
      //   this.scroll.refresh()
      // }, 100)
      this.$nextTick(() => { // 如果不加这个的话，shops只是数据更新了，但是DOM还没渲染好，加了nextTick就是等DOM渲染好再执行
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style>
  /* 因为pagination是动态生成的，所以下面设置的私有的样式没生效。指定了data-v-7918ad45 */
  .swiper-pagination-bullet-active{background: #02a774!important;}
</style>

<style lang="stylus" scoped>
  @import "~common/stylus/mixins.styl"
  .icon-sousuo
    font-size 25px
    color #fff
  .betterScrollWrap
    overflow hidden
    position absolute
    top 45px
    bottom 50px
    left 0
    right 0
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
