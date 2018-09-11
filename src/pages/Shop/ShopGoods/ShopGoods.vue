<template>
  <div>
good
  </div>
</template>

<script>
import {getShopGoods} from 'api/index.js'
export default {
  data () {
    return {

    }
  },
  components: {

  },
  created () {
    getShopGoods().then((res) => {
      // console.log(res)
    })
  }
}
</script>

<style lang='stylus' scoped>

</style>
