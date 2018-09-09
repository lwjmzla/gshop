<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}"
              @click.prevent="getCode()">{{countTime > 0 ? `已发送${countTime}秒` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="showPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="showPwd ? 'right' : ''"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" :src="captchaSrc" alt="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <alert-tip v-show="showAlert" :alertText="alertText" @closeTip="closeTip"></alert-tip>
  </section>
</template>

<script>
import AlertTip from 'components/AlertTip/AlertTip'
import {BASE_URL, reqPwdLogin, reqSendCode, reqSmsLogin, ERR_OK} from 'api/index.js'
export default {
  data () {
    return {
      loginWay: true, // true 代表 短信登录，false 代表 密码登录
      phone: '',
      countTime: 0,
      showPwd: false,
      pwd: '',
      code: '',
      name: '',
      captcha: '',
      alertText: '',
      showAlert: false,
      BASE_URL,
      timeStamp: 0
    }
  },
  components: {
    AlertTip
  },
  computed: {
    rightPhone () {
      return this.IsCorrectMobile(this.phone)
    },
    captchaSrc () {
      return BASE_URL + '/captcha?time=' + this.timeStamp // 其实这里可以不反向代理
    }
  },
  methods: {
    IsCorrectMobile (mobile) {
      var reg = new RegExp(/^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|166)[0-9]{8}$/)
      return reg.test(mobile)
    },
    async getCode () {
      if (!this.timer) {
        clearInterval(this.timer)
        this.timer = null
        this.countTime = 30
        this.timer = setInterval(() => {
          if (this.countTime > 0) {
            this.countTime--
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
        const result = await reqSendCode(this.phone)
        if (result.code === ERR_OK) {
          this.alertText = '已发送短信，请查收'
          this.showAlert = true
        } else {
          this.alertText = result.msg
          this.showAlert = true

          this.countTime = 0
          clearInterval(this.timer)
          this.timer = null
        }
      }
    },
    async login () {
      let result
      if (this.loginWay) { // 短信登录
        if (!this.IsCorrectMobile(this.phone)) {
          this.alertText = '手机号不正确'
          this.showAlert = true
          return false
        } else if (!/^\d{6}$/.test(this.code)) {
          this.alertText = '验证必须是6位数字'
          this.showAlert = true
          return false
        }
        // ajax
        result = await reqSmsLogin(this.phone, this.code)
      } else { // name登陆
        if (!this.name) {
          this.alertText = '用户名必须指定'
          this.showAlert = true
          return false
        } else if (!this.pwd) {
          this.alertText = '密码必须指定'
          this.showAlert = true
          return false
        } else if (!this.captcha) {
          this.alertText = '验证码必须指定'
          this.showAlert = true
          return false
        }
        // ajax
        result = await reqPwdLogin(this.name, this.pwd, this.captcha)
      }
      if (result.code === ERR_OK) {
        const data = result.data
      } else {
        this.alertText = result.msg
        this.showAlert = true
      }
    },
    closeTip () {
      this.showAlert = false
    },
    getCaptcha () {
      this.timeStamp = new Date().getTime()
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import "~common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                outline none
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
