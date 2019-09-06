<template>
  <div>
    <div class="head">
      <span>兴旺公司生猪屠宰场检测溯源监管系统</span>
      <div class="right-icon">
        <span style="color:white">
          张</span>
      </div>
    </div>
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
  font-size:23px;
  background: url("../assets/images/top_bg.png");
color: white
}
// .line{
//   height: 1px;
//   width: 100%;
//   background-color: grey
// }
.right-icon{
  color: white;
  float:right;
  background-color:#C5C5F8;
  border-radius: 4em;
  height: 36px;
  width:36px;
  text-align: center
// height: 36px;
// line-height: 36px
}
.van-button__text{
  color: black
}
.title-version{
float: right;
font-size: 22px
}
</style>
