<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" :class="{current: index === currentIndex}" v-for="(item,index) in goods" :key="index" @click="selectMenu(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="item.icon" :src="item.icon">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list-hook" ref="foodHook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(item,index) in good.foods" :key="index" @click="showFoodInfos(item)">
                <div class="icon">
                  <img width="57" height="57" :src="item.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{item.sellCount}} 份</span>
                    <span>好评率 {{item.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{item.price}}</span>
                    <span class="old" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="item" @addCount="addCount" @reduceCount="reduceCount"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- <food :food="food" @closeFoodInfos="food = {}"></food> -->
    <!-- 取消food组件了，因为food里面用到cart-control，数据不是用vuex传递 这样有点麻烦，下次用vuex传递数据 就没问题 -->
    <transition name="fade">
      <div class="food" v-show="food.name">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <p class="foodpanel-desc">{{food.info}}</p>
            <div class="back" @click="closeFoodInfos">
              <i class="iconfont icon-arrow_left"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售 {{food.sellCount}} 份</span>
              <span class="rating">好评率 {{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cart-control :food="food" :transition="false" @addCount="addCount" @reduceCount="reduceCount"></cart-control>
            </div>
          </div>
        </div>
        <div class="food-cover" @click="closeFoodInfos"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import {getShopGoods, ERR_OK} from 'api/index.js'
import CartControl from 'components/CartControl/CartControl'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      goods: [],
      currentIndex: 0,
      scrollY: 0,
      tops: [], // 右边每个类别到顶部的距离
      cartFoods: [],
      food: {}
    }
  },
  components: {
    CartControl
  },
  created () {
    getShopGoods().then((res) => {
      console.log(res)
      if (res.code === ERR_OK) {
        this.goods = res.data
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollL = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.scrollR = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.scrollR.on('scroll', (pos) => {
        for (let i = 0; i < this.tops.length; i++) {
          if (-pos.y >= -this.tops[i] && -pos.y < -this.tops[i + 1]) { // 这里对最后一个 tops[8]和tops[9] 比较时  因为tops[9] 不存在,所以比较不了，不满足条件
            this.currentIndex = i
            this.scrollL.scrollTo(0, 0)
            return
          }
          if (-pos.y >= -this.tops[this.tops.length - 1]) { // 这是针对最后的一个hook
            this.currentIndex = this.tops.length - 1
            this.scrollL.scrollToElement(document.querySelectorAll('.menu-item')[this.tops.length - 1]) // 这里用scrollTo就有bug
            return
          }
        }
      })
    })
  },
  watch: {
    goods (newVal) {
      this.$nextTick(() => {
        this.scrollL.refresh()
        this.scrollR.refresh()
        this._calculateTops()
      })
    }
  },
  methods: {
    selectMenu (index) {
      // this.currentIndex = index
      this.scrollR.scrollTo(0, this.tops[index], 300)
    },
    _calculateTops () {
      const elesFoodHook = [].slice.call(this.$refs.foodHook)
      elesFoodHook.forEach((el, index) => {
        const top = el.offsetTop
        this.tops.push(-top)
      })
    },
    addCount (food) {
      if (!food.count) {
        this.$set(food, 'count', 1) // 这一种新增方式 可以影响 Vue源数据 如果直接 food.count = 1 就没卵用
        this.cartFoods.push(food) // 感觉这样不行。。。数据的传递 还是vuex有前途。。。购物车这种，明天重写。
      } else {
        food.count++
      }
    },
    reduceCount (food) {
      if (food.count === 1) {
        const index = this.cartFoods.indexOf(food)
        this.cartFoods.splice(index, 1)
      }
      food.count--
    },
    showFoodInfos (food) {
      this.food = food
    },
    closeFoodInfos () {
      this.food = {}
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 101
    width: 100%
    &.fade-enter-active
      transition opacity .5s
    &.fade-enter
      opacity 0
    .food-content
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      width 80%
      height 65%
      z-index 66
      background #fff
      border-radius 5px
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .foodpanel-desc
          font-size 10px
          color #ddd
          letter-spacing 0
          position absolute
          bottom 0
          left 0
          right 0
          padding 0 10px 10px
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_left
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
      .content
        position: relative
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          height: 10px
          font-size: 0
          .sell-count, .rating
            font-size: 10px
            color: rgb(147, 153, 159)
          .sell-count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          border-radius: 12px
          font-size: 10px
          color: #fff
          background: rgb(0, 160, 220)
          &.fade-transition
            transition: all 0.2s
            opacity: 1
          &.fade-enter, &.fade-leave
            opacity: 0
    .food-cover
      position absolute
      top 0
      right 0
      bottom -48px
      left 0
      z-index 55
      background-color rgba(0, 0, 0, 0.5)
</style>
