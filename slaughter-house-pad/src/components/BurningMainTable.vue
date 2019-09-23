<template>
  <div>
    <van-list>
      <div v-for="(batchInfo,index) in batchInfos" :key="index" class="item" @click="goDetail(batchInfo)">
        <div class="first">
          <span>血码：</span><span>{{ batchInfo.blood }}</span>
          <div class="line" />
          <span>批次号：</span><span>{{ batchInfo.batchCode }}</span>
          <div class="line" />
          <span>货主：</span><span>{{ batchInfo.supplyInfo.name }}</span>
          <span class="right_btn">{{ isType ==0?'待灼刻':isType == 1?'灼刻中':'已灼刻' }}</span>
        </div>
        <div class="second">
          <span class="first_span">检疫证数量(头):</span><span class="second_span">{{ batchInfo.countInquarantine }}</span>
          <span class="first_span">到场数量(头):</span><span class="second_span">{{ batchInfo.arrivedCount }}</span>
          <span class="first_span">来源:</span><span :class="[{'color3':batchInfo.tuzaiType==1},{'color4':batchInfo.tuzaiType!=1},'second_span',]" >{{ batchInfo.tuzaiType === 1?'代宰':'自营' }}</span>
          <span class="first_span">创建日:</span><span class="second_span">{{ formateTime(batchInfo.createTime) }}</span>
          <span class="first_span">毛重(Kg):</span><span class="second_span">{{ batchInfo.grossWeight }}</span>
          <span class="first_span">生猪净重(Kg):</span><span class="second_span">{{ batchInfo.netWeight }}</span>
          <span class="first_span" >检测结果:</span><span :class="[{'color2':batchInfo.testResult==='合格'},{'color1':batchInfo.testResult!=='合格'},'second_span']" >{{ batchInfo.testResult }}</span>
        </div>
        <div class="heng_line"></div>
        <div v-if="isType==0" class="third">
          <div style="text-align: right;">
            <el-button plain @click.stop="startTuzai(batchInfo)">开始屠宰</el-button>
          </div>

        </div>
      </div>
    </van-list>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="tips2">
        <div class="tips_title">
          <span>提示</span>
          <van-icon color="white" name="cross" @click="closeTip"/>
        </div>
        <div class="tips_body">
          <img src="../assets/img/icon_tips.png">
          <div class="content">
            {{ errorTip }}
          </div>
          <van-button size="large" plain round @click="closeTip">关闭</van-button>
        </div>
      </div>
    </van-popup>
    <van-loading v-if="uploadImgShow" size="30px" text-size="30px" vertical>上传图片中，请稍等...</van-loading>
    <van-popup v-model="showEditStatus" :close-on-click-overlay="false">
      <div class="tips">
        <div class="tips_title">
          <span>提示</span>
          <van-icon color="white" name="cross" @click="close"/>
        </div>
        <div class="tips_body">
          <div class="content">
            确认下发屠宰队列？
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
    <van-popup v-model="showTuzaiInfo" :close-on-click-overlay="false">
      <div class="tips3">
        <div style="color: #0066FF;
    font-size: 30px;
    margin-top: 20px;
    text-align: center;">{{ showTuzaiInfoDetail.status===4 ?'灼刻已经完成':'当前正在屠宰' }}</div>
        <div class="tips_body">
          <div style="font-size: 28px;margin-top: 20px;color: rgb(159, 171, 189);">血码</div>
          <div style="color: #0066FF;
    font-size: 60px;
    margin-top: 20px;" >{{ showTuzaiInfoDetail.blood }}</div>
          <div style="font-size: 28px;margin-top: 20px;color: rgb(159, 171, 189);">货主</div>
          <div style="font-size: 40px;margin-top: 20px;color: #596880;">{{ showTuzaiInfoDetail.supplyInfo?showTuzaiInfoDetail.supplyInfo.linkerName:'' }}</div>
        </div>
        <van-button size="large" type="info" @click="stopXunlun">关闭</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import apis from '@/apis/index'
  import tuzhaManager from '@/apis/cloudStorageApi'
  import util from '@/utils/tools'
  import { Toast } from 'vant'
  import { eventBus } from '@/utils/eventBus'
  export default {
    name: 'Title',
    props: {
      isType: {
        type: Number,
        default () {
          return 0
        }
      }
    },
    data () {
      return {
        batchInfos: [],
        checks: [],
        icon: {
          active: '../assets/img/icon-unselect.png',
          inactive: '../assets/img/icon-select.png'
        },
        checkData: {},
        tuzaiBatchInfo: {
          checkResultInfo: {
            sampleId: '',
            sampleRate: '5',
            sampleCount: '',
            jianyiNumId: '',
            operatorId: '输入采样人姓名',
            clenCheckResult: 1,
            rhciCheckResult: 1,
            salCheckResult: 1,
            asfCheckResult: 1,
            asfCheckResultFileId: ''
          }
        },
        multipleSelection: [],
        showEditResult: false,
        showEditWeight: false,
        batchStatus: this.isType === 0 ? 2 : this.isType === 1 ? 3 : 4,
        errorTip: '',
        show: false,
        uploadImgShow: false,
        checkBatchInfo: {},
        showEditStatus: false,
        showTuzaiInfo: false,
        myInterval: Object,
        showTuzaiInfoDetail: {}
      }
    },
    created () {
      this.getBatchList()
      eventBus.$on('fresh', () => {
        this.checks = []
        this.getBatchList()
      })
    },
    methods: {
      startTuzai (info) {
        this.showEditStatus = true
        this.checkData = info
      },
      lunxun () {
        this.showTuzaiInfoDetail = this.checkData
        this.showTuzaiInfo = true
        this.myInterval = window.setInterval(() => {
          setTimeout(() => {
            this.getDetail()
          }, 1)
        }, 5000)
      },
      stopXunlun () {
        this.showTuzaiInfo = false
        eventBus.$emit('fresh')
        window.clearInterval(this.myInterval)
      },
      getDetail () {
        let _this = this
        apis.request(tuzhaManager.queryBatchInfo, { tuzaiBatchId: this.checkData.batchId }).then(function (res) {
          console.log('res  ===  ', res)
          if (res.data.result.resultCode === '000000') {
            _this.showTuzaiInfoDetail = res.data.tuzaiBatchInfo
          }
        }).catch(function (error) {
          console.log('error  ====  ', error)
        })
      },
      submit () {
        let _this = this
        let dataCopy = [this.checkData.batchId]
        apis.request(tuzhaManager.updateBatchStatus, { batchIdList: dataCopy, status: 3 }).then(function (res) {
          console.log(res)
          if (res.data.result.resultCode === '000000') {
            _this.showEditStatus = false
            _this.lunxun()
            // eventBus.$emit('fresh')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      formateTime (val) {
        return util.formaTime(val)
      },
      getBatchList () {
        let _this = this
        apis.request(tuzhaManager.queryBatchInfoList, { batchStatus: this.batchStatus }).then(function (res) {
          console.log(res)
          if (res.data.result.resultCode === '000000') {
            _this.batchInfos = res.data.tuzaiBatchInfos
            for (let i = 0; i < _this.batchInfos.length; i++) {
              if (_this.batchInfos[i].checkResultInfo.clenCheckResult === 0 || _this.batchInfos[i].checkResultInfo.rhciCheckResult === 0 ||
              _this.batchInfos[i].checkResultInfo.salCheckResult === 0 || _this.batchInfos[i].checkResultInfo.asfCheckResult === 0) {
                _this.batchInfos[i].testResult = '-'
              } else if (_this.batchInfos[i].checkResultInfo.clenCheckResult === 1 && _this.batchInfos[i].checkResultInfo.rhciCheckResult === 1 &&
              _this.batchInfos[i].checkResultInfo.salCheckResult === 1 && _this.batchInfos[i].checkResultInfo.asfCheckResult === 1) {
                _this.batchInfos[i].testResult = '合格'
              } else {
                _this.batchInfos[i].testResult = '不合格'
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      goDetail (batchInfo) {
        this.$router.push({
          path: '/detail',
          query: {
            batchId: batchInfo.batchId
          }
        })
      },
      close () {
        this.show = false
        this.showEditStatus = false
        this.showTuzaiInfo = false
      },
      closeTip () {
        this.show = false
      }

    }
  }
</script>
<style lang="scss" scoped>
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
.van-loading{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100000000;
    top: 0;
    /* display: flex; */
    /* align-items: center; */
    background: black;
    opacity: 0.4;
    padding-top: 27%;
}
.color1{
color: #4C5970;
}
.color2{
  color:#1FC749
}
.color3{
  color: #6666FF !important
}
.color4{
  color:#FF6600 !important
}
.van-icon{
  line-height: inherit
}
.line{
height: 1px;
width:100%;
background-color:#DFDFDF
}
.item{
  border-radius:8px;
  border: 1px solid  #DDE0E8;
  margin-bottom: 16px;
  font-size:20px;
  color: #4C5970;
  .first{
    padding: 14px;
    background-color:#ECEEF2;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .heng_line{
    width: 100%;
    height: 1px;
    background-color: #DDE0E8
  }
  .second{
padding: 14px;
color: #8391A6;
font-size: 19px;
.first_span:nth-child(n+2){
margin-left: 12px;
}
.second_span{
color:#4C5970;
margin-left: 6px;
}
}
  .third{
padding: 14px;
color: #8391A6;
  }
  .el-button{
font-size: 17px
  }
  .line{
    background-color: #59677F;
    display: -webkit-inline-box;
    width: 1px;
    height: 16px;
    margin-left: 8px;
    margin-right: 8px;
      }
      .right_btn{
float: right;
color: #3A88FC;
      }

}
.tips{
  .van-button{
font-size:20px;
margin-top:20px;
    border: 1px solid #4747E9;
    // border-radius: 6px;
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
.tips2{
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
 .top{
    margin-top: 14px;
  }
.van-col {
border: 1px #E4E7EC solid;
border-radius: 4px;
    font-size: 20px;
    padding-left:8px;
    float: left;
    height:50px;
line-height: 50px;
}
.van-popup{
    border-radius: 8px;
}
.tips3{
 padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 100px;
    padding-right: 100px;
  .van-button{
    font-size:20px;
    margin-top:20px;
    border: 1px solid #4747E9;
    color: #ffffff;
    border-radius: 8px;
    padding-left: 20px;
    padding-right: 20px;
  }
font-size:20px;
.tips_body{
      border: 1px rgb(159, 171, 189) dashed;
  text-align: center;
  padding-bottom: 20px;
    padding-left: 60px;
    padding-right: 60px;
    margin-top: 20px;
  .content{
margin-top:20px;
  }
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
