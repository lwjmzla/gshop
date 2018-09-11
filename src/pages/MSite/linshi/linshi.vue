<template>
  <transition>
    <div class="wrap" @click="$router.back()">
1111111111111
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang='stylus' scoped>
  .v-enter-active,.v-leave-active
    transition all 0.3s
  .v-enter,.v-leave-to
    transform translateX(100%)
  .wrap
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background #fff
    z-index 101
</style>
