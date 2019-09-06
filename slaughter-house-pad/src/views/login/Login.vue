<template>
  <div class="bg">
    <div class="body">
      <div style="width:100%;text-align:center">
      <span class="title">兴旺公司生猪屠宰场检测溯源监管系统</span></div>
      <van-divider :style="{borderColor: '#333'}"/>
      <div>      <el-input v-model="name" size="large" type="text" placeholder="请输入用户名">
      </el-input>      </div>
      <div class="password">
        <el-input v-model="password" size="large" type="text" placeholder="请输入密码">

      </el-input></div>
      <van-button type="info" class="login-btn" @click="login">登录</van-button>
      <span class="company-info">版权所有：南京混沌信息科技有限公司</span>
    </div>
</div></template>
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
        password: '',
        name: ''
      }
    },
    created () {
    },
    methods: {
      login () {
        this.$store.commit('SET_LOGIN_INFO', {
          ...this.formData,
          name: '张小兵'
        })
        this.$router.push({
          path: '/main'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.bg{
      background: url(../../assets/images/login_bg.png) no-repeat;
    height: 100%;
    width: 100%;
        position: fixed;
}

.body{
width: 60%;
margin-left: auto;
margin-right: auto;
margin-top: 15%;
box-shadow: 0 0 1px #333 inset;
padding: 40px;
    border-radius: 8px;
    background: white
}
.password{
  margin-top: 20px
}
.login-btn{
  width: 100%;
  margin-top: 30px;
  border-radius: 8px;
  font-size: 16px;
  height: 50px;
  line-height: 50px
}
.company-info{
    position: fixed;
    bottom: 0;
    margin-bottom: 40px;
    font-size: 18px;
    text-align: center;
    width: inherit;
}
.title{
      color: blue;
    text-align: center;
}
</style>
