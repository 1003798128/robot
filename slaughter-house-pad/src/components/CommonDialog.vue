<template>
  <el-dialog :visible.sync="dialogTableVisible" title="收货地址">

  </el-dialog>
</template>
<script>
export default {
  name: 'CommonDialog',
  data () {
    return {
      dialogTableVisible: true
    }
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
  background: url("../assets/img/top_bg.png");
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
