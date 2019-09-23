<template>
  <div>
    <div class="no_scroll">
      <titleBar></titleBar>
      <div class="body">
        <div>
          <el-radio-group v-model="labelPosition" size="large">
            <el-radio-button :label="0">待下发</el-radio-button>
            <el-radio-button :label="1">已下发</el-radio-button>
            <el-radio-button :label="2">不合格</el-radio-button>
          </el-radio-group>

          <div style="float: right;">
            <el-button plain @click="createNewBatch">创建批次</el-button>
            <el-button v-if="labelPosition == 0" plain @click="checkXiafa" >下发屠宰队列</el-button>
            <!-- <el-button v-if="labelPosition == 0" plain icon="el-icon-edit-outline">编辑</el-button> -->
            <el-button v-if="labelPosition == 0" plain @click="deleteBatch">删除</el-button>
          </div>
        </div>
      </div>
      <van-divider />
    </div>
    <mainTable v-show="labelPosition == 0" :is-type="0" class="main" @get="get"></mainTable>
    <mainTable v-show="labelPosition == 1" :is-type="1" class="main" ></mainTable>
    <mainTable v-show="labelPosition == 2" :is-type="2" class="main" ></mainTable>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="tips">
        <div class="tips_title">
          <span>重量编辑</span>
          <van-icon color="white" name="cross" @click="close"/>
        </div>
        <div class="tips_body">
          <img src="../assets/img/icon_tips.png">
          <div class="content">
            账户信息不存在，请联系管理员确认
          </div>
          <van-button size="large" plain round @click="close">关闭</van-button>

        </div>
      </div>
    </van-popup>
    <van-popup v-model="showEditStatus" :close-on-click-overlay="false">
      <div class="tips">
        <div class="tips_title">
          <span>提示</span>
          <van-icon color="white" name="cross" @click="close"/>
        </div>
        <div class="tips_body">
          <div class="content">
            {{ errorTip }}
          </div>
        </div>
        <div class="line"/>
        <div>
          <div style="width: 49%; height: 50px;line-height: 50px;color: rgb(135, 135, 135);font-size: 22px;float: left;text-align: center;" @click="submit">确定</div>
          <div style="float: left;width: 1px;height: 30px;background-color: #B4B4B4;margin-top: 10px;"></div>
          <div style="width: 49%;height: 50px;line-height: 50px;color: #B4B4B4;font-size: 22px;float: left;text-align: center;" @click="close">取消</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  // import config from '../apis/config'
  import titleBar from '@/components/TitleBar.vue'
  import mainTable from '@/components/MainTable.vue'
  import apis from '@/apis/index'
  import tuzhaManager from '@/apis/cloudStorageApi'
  import { Toast } from 'vant'
  import { eventBus } from '@/utils/eventBus'
  export default {
    name: 'Main',
    components: {
      'titleBar': titleBar,
      'mainTable': mainTable
    },
    data () {
      return {
        labelPosition: 0,
        show: false,
        checkData: [],
        showEditStatus: false,
        errorTip: ''
      }
    },
    created () {
    },
    methods: {
      xiafa () {
        let _this = this
        let checkBatchId = []
        for (let i = 0; i < this.checkData.length; i++) {
          checkBatchId.push(this.checkData[i].batchId)
        }
        apis.request(tuzhaManager.updateBatchStatus, { batchIdList: checkBatchId, status: 2 }).then(function (res) {
          console.log(res)
          if (res.data.result.resultCode === '000000') {
            _this.showEditStatus = false
            eventBus.$emit('fresh')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      checkXiafa () {
        if (this.checkData.length === 0) {
          Toast('请至少选择一个批次')
          return true
        }
        let check = true
        for (let i = 0; i < this.checkData.length; i++) {
          if (this.checkData[i].grossWeight && this.checkData[i].grossWeight !== '') {

          } else {
            check = false
          }
        }
        if (!check) {
          Toast('请先编辑重量')
          return false
        }
        let check2 = true
        for (let i = 0; i < this.checkData.length; i++) {
          if (this.checkData[i].grossWeight && this.checkData[i].grossWeight !== '') {

          } else {
            check2 = false
          }
        }
        if (!check2) {
          Toast('请先编辑检测信息')
          return false
        }
        this.errorTip = '确认下发屠宰？'
        this.showEditStatus = true
      },
      submit () {
        if (this.errorTip === '确认下发屠宰？') {
          this.xiafa()
          return
        }
        let _this = this
        let checkBatchId = []
        for (let i = 0; i < this.checkData.length; i++) {
          checkBatchId.push(this.checkData[i].batchId)
        }
        apis.request(tuzhaManager.updateBatchStatus, { batchIdList: checkBatchId, status: 99 }).then(function (res) {
          console.log(res)
          if (res.data.result.resultCode === '000000') {
            _this.showEditStatus = false
            eventBus.$emit('fresh')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      deleteBatch () {
        console.log(this.checkData)
        if (this.checkData.length === 0) {
          Toast('请至少选择一个批次')
          return
        }
        this.errorTip = '确认删除批次'
        this.showEditStatus = true
      },
      createNewBatch () {
        this.$router.push({
          path: '/createNewBatch'
        })
      },
      close () {
        this.show = false
        this.showEditStatus = false
      },
      get (val) {
        console.log(val)
        this.checkData = val
      }
    }
  }
</script>
<style lang="scss" scoped>
img{
      height: 26px;
    width: 26px;
    float: right;
    margin-right: 20px;
    /* margin-top: auto; */
    /* margin-bottom: auto; */
    margin-top: 12px;
}
.van-icon{
  line-height: inherit
}
.no_scroll{
    position: fixed;
    top:0;
    background: white;
    width: 100%;
.body{
  padding: 20px;
  padding-bottom: 0px;

  .van-divider{
    border-color: #999;
  }
}
}
.main{
    margin-top: 170px;
  height: calc(100vh - 150px);
    overflow: auto;
  padding: 20px;
  padding-top: 0px;
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
.line{
height: 1px;
width:100%;
background-color:#DFDFDF
}
</style>
