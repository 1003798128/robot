<template>
  <div>
    <titleBar></titleBar>
    <div class="body">
      <input type="text" placeholder="请输入用户名" class="input">
      <input type="password" placeholder="请输入密码" class="input password">
    </div>
  </div>
</template>
<script>
  // import config from '../apis/config'
  import titleBar from '@/components/TitleBar.vue'

  export default {
    name: 'Login',
    components: {
      'titleBar': titleBar
    },
    data () {
      return {
      }
    },

    created () {
    }
  }
</script>
<style lang="scss" scoped>
.input{
  outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 13px 14px;
    width: 620px;
    font-size: 14px;
    font-weight: 700;
    font-family: "Microsoft soft";
}
.body{
width: 60%;
margin-left: auto;
margin-right: auto;
margin-top: 10%;
}
.password{
  margin-top: 20px
}
</style>
