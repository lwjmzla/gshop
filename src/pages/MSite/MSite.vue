<template>
  <section class="msite">
    <!--首页头部-->
    <header-top :title="title">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
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
      <shop-list></shop-list>
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
export default {
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      title: '',
      baseImageUrl: 'https://fuss10.elemecdn.com',
      categorys: []
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
      console.log(res)
    })
  },
  computed: {
    ...mapGetters(['latitude', 'longitude'])
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
  }
}
</script>

<style>
  /* 因为pagination是动态生成的，所以下面设置的私有的样式没生效。指定了data-v-7918ad45 */
  .swiper-pagination-bullet-active{background: #02a774!important;}
</style>

<style lang="stylus" scoped>
  @import "~common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
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
