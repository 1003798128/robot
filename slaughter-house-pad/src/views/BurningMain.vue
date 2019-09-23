<template>
  <div>
    <div class="no_scroll">
      <titleBar></titleBar>
      <div class="body">
        <div>
          <el-radio-group v-model="labelPosition" size="large">
            <el-radio-button :label="0">待灼刻</el-radio-button>
            <el-radio-button :label="1">灼刻中</el-radio-button>
            <el-radio-button :label="2">已灼刻</el-radio-button>
          </el-radio-group>

          <div v-show="labelPosition === 0&&showTotal" style="float: right;">
            <span style="color:#999999;font-size: 20px;">待灼刻</span>
            <span style="font-size: 28px;margin-left: 4px;color: #FF3F00;">{{ total }}</span>
          </div>
        </div>
      </div>
      <van-divider />
    </div>
    <mainTable v-show="labelPosition == 0" :is-type="0" class="main" ></mainTable>
    <mainTable v-show="labelPosition == 1" :is-type="1" class="main" ></mainTable>
    <mainTable v-show="labelPosition == 2" :is-type="2" class="main" ></mainTable>
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
  import mainTable from '@/components/BurningMainTable.vue'
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
        errorTip: '',
        showTotal: false,
        total: 0
      }
    },
    created () {
      this.getTotal()
    },
    methods: {
      getTotal () {
        let _this = this
        apis.request(tuzhaManager.queryBatchInfoList, { batchStatus: 2 }).then(function (res) {
          console.log(res)
          if (res.data.result.resultCode === '000000') {
            if (res.data.totalCount && res.data.totalCount !== 0) {
              _this.total = res.data.totalCount
              _this.showTotal = true
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      submit () {

      },
      close () {
        this.show = false
        this.showEditStatus = false
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
