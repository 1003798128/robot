<template>
  <div class="head">
    <div class="head_in">
      <div class="logo iconfont icon-logo">
      </div>
      <div class="info">{{ sysConfig.brandName }}</div>
    </div>
  </div>
</template>
<script>
  // import config from '../apis/config'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Logo',
    data () {
      return {
        productName: ''
      }
    },
    computed: {
      ...mapGetters([
        'sysConfig'
      ])
    },
    created () {
      // this.productName = config.productName
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/css/variable";
  .logo{
    padding: 1rem 0 .1rem 0;
    font-size: 1.7rem;
    color: $theme-color;
  }
  .info{
    font-weight: bold;
    font-size: .40rem;
    color: #e43937;
  }
  .head{
    font-size: .36rem;
    text-align: center;
    color: #666666;
    background-color: #ecf0f3;
    padding-bottom: .6rem;
  }

</style>
