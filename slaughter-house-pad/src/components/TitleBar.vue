<template>
  <div>
    <div class="head">
      <span>兴旺公司生猪屠宰场检测溯源监管系统</span>
      <van-button v-if="loginInfo.name" round class="right-icon">{{ loginInfo.name }}</van-button>
      <span v-else class="title-version">V1.0</span>

    </div>
    <div class="line"></div>
  </div>
</template>
<script>
  // import config from '../apis/config'
  import { mapGetters } from 'vuex'
  import Vue from 'vue'
  import { Button } from 'vant'
  Vue.use(Button)
  export default {
    name: 'Title',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'loginInfo'
      ])
    },
    created () {
    }
  }
</script>
<style lang="scss" scoped>
.head{
  height: 30px;
  padding: 20px;
  font-size:23px
}
.line{
  height: 1px;
  width: 100%;
  background-color: grey
}
.right-icon{
  float:right;
  background-color:transparent;
border: 1px solid grey;
height: 36px;
line-height: 36px
}
.van-button__text{
  color: black
}
.title-version{
float: right;
font-size: 22px
}
</style>
