<template>
  <div class="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
import FooterGuide from 'components/FooterGuide/FooterGuide'
import {getUserInfo, ERR_OK} from 'api/index.js'
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  async created () {
    const result = await getUserInfo()
    if (result.code === ERR_OK) {
      const userInfo = result.data
      this.setUserInfo(userInfo)
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
