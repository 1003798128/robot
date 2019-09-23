<template>
  <div class="bg">
    <div class="body">
      <div style="width:100%;text-align:center">
      <span class="title">兴旺公司生猪屠宰场检测溯源监管系统</span></div>
      <van-divider :style="{borderColor: '#333'}"/>
      <div style="margin-top:20px;font-size: 20px;">
        <el-input v-model="account" class="input" size="large" type="text" placeholder="请输入用户名"/>
      </div>
      <div class="password">
        <el-input v-model="password" class="input" size="large" type="password" placeholder="请输入密码"/>
      </div>
      <van-button type="info" class="login-btn" @click="login">登录</van-button>
    </div>
    <div style="text-align:center"> <span id="bottom" class="company-info">版权所有：南京混沌信息科技有限公司</span></div>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="tips">
        <div class="tips_title">
          <span>提示</span>
          <van-icon color="white" name="cross" style="line-height: inherit;" @click="close" />
        </div>
        <div class="tips_body">
          <img src="../assets/img/icon_tips.png">
          <div class="content">
            {{ errTips }}
          </div>
          <van-button size="large" plain round @click="close">关闭</van-button>

        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  // import config from '../apis/config'
import util from '@/utils/util'
import apis from '@/apis/index'
import tuzhaManager from '@/apis/cloudStorageApi'
import { Toast } from 'vant'
export default {
  name: 'Login',
  components: {

  },
  data () {
    return {
      password: '',
      account: '',
      show: false,
      errTips: ''
    }
  },
  created () {

  },
  methods: {

    auther (profileIds) {
      let _this = this
      apis.request(tuzhaManager.queryUserGroupList, { groupType: 1, profileId: profileIds }).then(function (res) {
        console.log('res  ===  ', res)
        if (res.data.result.resultCode === '000000') {
          let role = res.data.userGroupInfos[0].userRoleInfos[0].roleId
          if (role === '1002') {
            _this.$router.push({
              path: '/burningMain'
            })
          } else if (role === '1003') {
            _this.$router.push({
              path: '/main'
            })
          } else {
            _this.errTips = '该账号无权限登录系统'
            _this.show = true
          }
        } else {
          _this.errTips = res.data.result.resultDescription
          _this.show = true
        }
      }).catch(function (error) {
        console.log('error  ====  ', error)
      })
    },
    close () {
      this.show = false
    },
    login () {
      let _this = this
      if (!this.account) {
        Toast('请输入有效的用户名')
        return
      }
      if (!this.password) {
        Toast('请输入有效的密码')
        return
      }
      apis.request(tuzhaManager.login, { username: this.account, password: util.Encrypt(this.password) }).then(function (res) {
        console.log('res  ===  ', res)
        if (res.data.result.resultCode === '000000') {
          if (res.data.userInfo.username) {
            _this.$store.commit('SET_LOGIN_INFO', {
              ..._this.formData,
              name: res.data.userInfo.username.substring(0, 1)
            })
          }
          _this.auther(res.data.profileId)
        } else {
          _this.errTips = res.data.result.resultDescription
          _this.show = true
        }
      }).catch(function (error) {
        console.log('error  ====  ', error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bg{
      background: url(../assets/img/login_bg.png) no-repeat;
height: 100vh;
width: 100%;
/* position: fixed; */
background-size: 100%;
padding-top: 10%;
/* overflow: hidden; */
box-sizing: border-box;
}
.van-icon{
  line-height: inherit
}
.body{
width: 60%;
margin-left: auto;
margin-right: auto;
box-shadow: 0 0 1px #333 inset;
padding: 40px;
    border-radius: 8px;
    background: white
}
.password{
  margin-top: 20px;
  font-size: 20px;
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

    margin-bottom: 40px;
    font-size: 18px;
    text-align: center;
    width: inherit;
}
.title{
      color: blue;
    text-align: center;
}

.tips{
  .van-button{
font-size:20px;
margin-top:20px;
    border: 1px solid #4747E9;
    color: #4747E9;
    padding-left: 20px;
    padding-right: 20px;
  }
font-size:20px;
.tips_body{
  text-align: center;
  .content{
margin-top:20px;
  }
  padding: 60px;
}
.van-popup{
    border-radius: 8px;
}
.tips_title{
  padding:12px;
  background-color:#3B3BE8;
  color:white;
  .van-icon{
    float: right
  }
}
}
</style>
