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
          <span class="right_btn">{{ isType ==0?'待下发':isType == 1?'已下发':'不合格' }}</span>
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
          <van-checkbox v-model="checks[index]" @click.stop="checks[index]=!checks[index]" @change="changeChecks">
            <img
              v-if="checks[index]"
              slot="icon"
              src="../assets/img/icon-select.png"
            >
            <img
              v-else
              slot="icon"
              src="../assets/img/icon-unselect.png"
            >
          </van-checkbox>
          <div style="position: relative;bottom: 34px;display: flex;float: right;float: right;">
            <el-button plain @click.stop="editResult(batchInfo)">编辑检测结果</el-button>
            <el-button plain @click.stop="editWeight(batchInfo)">编辑重量</el-button>
          </div>

        </div>
      </div>
    </van-list>

    <van-popup v-model="showEditWeight" :close-on-click-overlay="false">
      <div class="tips">
        <div class="tips_title">
          <span>重量编辑</span>
          <van-icon color="white" name="cross" @click="close"/>
        </div>
        <div class="tips_body">
          <el-input v-model="roughWeight" class="input" size="large" type="number" placeholder="输入毛重(Kg)"/>
          <el-input v-model="netWeight" style="margin-top: 20px;" class="input" size="large" type="number" placeholder="输入皮重(Kg)"/>
        </div>
        <div class="line"/>
        <div>
          <div style="width: 49%; height: 50px;line-height: 50px;color: rgb(135, 135, 135);font-size: 22px;float: left;text-align: center;" @click="submit">确定</div>
          <div style="float: left;width: 1px;height: 30px;background-color: #B4B4B4;margin-top: 10px;"></div>
          <div style="width: 49%;height: 50px;line-height: 50px;color: #B4B4B4;font-size: 22px;float: left;text-align: center;" @click="close">取消</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showEditResult" :close-on-click-overlay="false" class="editResult">
      <div class="tips3">
        <div class="tips_title">
          <span>检测结果编辑</span>
          <van-icon color="white" name="cross" @click="close"/>
        </div>
        <div class="tips_body">
          <van-row class="top">
            <van-col span="11" style="text-align: left;" class="span8">
              <span >采样基数5%</span>
            </van-col>
            <van-col span="11" style="border:inherit;padding-left:0px" class="span8 second_col text">
              <el-input v-model="tuzaiBatchInfo.checkResultInfo.sampleCount" placeholder="请输入采样数量"></el-input>
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="11" style="border:inherit;padding-left:0px" class="span8">
              <el-input v-model="tuzaiBatchInfo.checkResultInfo.sampleId" placeholder="请输入采样编号"></el-input>
            </van-col>
            <van-col span="11" style="" class="span8 second_col text">
              <span >{{ checkBatchInfo.supplyInfo? checkBatchInfo.supplyInfo.name:'' }}</span>
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="11" style="border:inherit;padding-left:0px" class="span8">
              <el-input v-model="tuzaiBatchInfo.checkResultInfo.jianyiNumId" placeholder="输入检疫证编号"></el-input>
            </van-col>
            <van-col span="11" class="span8 second_col text" @click.native="selectOperate">
              <span>{{ tuzaiBatchInfo.checkResultInfo.operatorId }}</span>
              <van-icon name="arrow-down" />
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="11" class="span8" style="padding-left:0px;">
              <van-dropdown-menu :overlay="false">
                <van-dropdown-item v-model="tuzaiBatchInfo.checkResultInfo.clenCheckResult" :options="option1" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="11" class="span8 second_col text" style="padding-left:0px;">
              <van-dropdown-menu :overlay="false">
                <van-dropdown-item v-model="tuzaiBatchInfo.checkResultInfo.rhciCheckResult" :options="option2" />
              </van-dropdown-menu>
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="11" class="span8" style="padding-left:0px;">
              <van-dropdown-menu :overlay="false">
                <van-dropdown-item v-model="tuzaiBatchInfo.checkResultInfo.salCheckResult" :options="option3" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="11" class="span8 second_col text" style="padding-left:0px;">
              <van-dropdown-menu :overlay="false">
                <van-dropdown-item v-model="tuzaiBatchInfo.checkResultInfo.asfCheckResult" :options="option4" />
              </van-dropdown-menu>
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="11" class="span8" style="text-align: left;">
              <span>检测结果：{{ getTestResult }}</span>
            </van-col>
            <van-col span="11" class="span8 second_col text" style="text-align: left;">
              <van-uploader :after-read="afterRead1">
                <span :class="[{'hasPhoto':tuzaiBatchInfo.checkResultInfo.asfCheckResultFileId},{'noHasPhoto':!tuzaiBatchInfo.checkResultInfo.asfCheckResultFileId}]">拍摄非洲猪瘟检测报告单</span>
                <img v-if="!tuzaiBatchInfo.checkResultInfo.asfCheckResultFileId" src="../assets/img/icon-camera.png" />
                <img v-else src="../assets/img/c-blue.png" />
              </van-uploader>
            </van-col>
          </van-row>
        </div>
        <div class="line"/>
        <div>
          <div style="width: 49%;height: 50px;line-height: 50px;color: rgb(135, 135, 135);font-size: 22px;float: left;text-align:center;" @click="submitTest">确定</div>
          <div style="float: left;width: 1px;height: 30px;background-color: #B4B4B4;margin-top: 10px;"></div>
          <div style="width: 49%;eight: 50px;line-height: 50px;color: #B4B4B4;font-size: 22px;float: left;text-align: center;" @click="close">取消</div>
        </div>
      </div>
    </van-popup>
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
    <van-popup v-model="showOperate" :close-on-click-overlay="false">
      <div class="tips2">
        <div class="tips_title">
          <span>选择货主</span>
          <van-icon color="white" name="cross" @click="closeOperate"/>
        </div>
        <div class="tips_body">
          <div v-for="(operate,index) in operateArray" :key="index" >
            <van-cell :title="operate.operatorName" @click="checkOperate(operate)"/>
          </div>
      </div>  </div>
    </van-popup>
    <van-loading v-if="uploadImgShow" size="30px" text-size="30px" vertical>上传图片中，请稍等...</van-loading>

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
        showOperate: false,
        operateArray: [],
        roughWeight: '',
        netWeight: '',
        batchInfos: [],
        checks: [],
        icon: {
          active: '../assets/img/icon-unselect.png',
          inactive: '../assets/img/icon-select.png'
        },
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
        batchStatus: this.isType === 0 ? 1 : this.isType === 1 ? 2 : 5,
        errorTip: '',
        show: false,
        uploadImgShow: false,
        checkBatchInfo: {},
        option1: [
        { text: '瘦肉精:克伦特罗 检测结果-阴性', value: 1 },
        { text: '瘦肉精:克伦特罗 检测结果-阳性', value: 2 }
        ],
        option2: [
        { text: '瘦肉精:莱克多巴胺 检测结果-阴性', value: 1 },
        { text: '瘦肉精:莱克多巴胺 检测结果-阳性', value: 2 }
        ],
        option3: [
        { text: '瘦肉精:沙丁胺醇 检测结果-阴性', value: 1 },
        { text: '瘦肉精:沙丁胺醇 检测结果-阳性', value: 2 }
        ],
        option4: [
        { text: '非洲猪瘟 检测结果-阴性', value: 1 },
        { text: '非洲猪瘟 检测结果-阳性', value: 2 }
        ]
      }
    },
    computed: {
      getTestResult: function () {
        console.log(this.tuzaiBatchInfo)
        if (this.tuzaiBatchInfo.checkResultInfo.clenCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.rhciCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.salCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.asfCheckResult === 1) {
          return '合格'
        } else {
          return '不合格'
        }
      }
    },
    created () {
      this.getBatchList()
      // window.document.getElementById
      eventBus.$on('fresh', () => {
        this.checks = []
        this.getBatchList()
      })
    },
    methods: {
      submitTest () {
        let _this = this
        if (!this.check()) {
          return true
        }
        if (this.tuzaiBatchInfo.checkResultInfo.clenCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.rhciCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.salCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.asfCheckResult === 1) {

        } else {
          this.tuzaiBatchInfo.status = 5
        }
        this.tuzaiBatchInfo.batchId = this.checkBatchInfo.batchId
        this.tuzaiBatchInfo.batchCode = this.checkBatchInfo.batchCode
        apis.request(tuzhaManager.modifyBatchInfo, { 'tuzaiBatchInfo': this.tuzaiBatchInfo }).then(function (res) {
          console.log('res  ===  ', res)
          if (res.data.result.resultCode === '000000') {
            eventBus.$emit('fresh')
            _this.showEditResult = false
          } else {
            _this.errTips = res.data.result.resultDescription
            _this.show = true
          }
        }).catch(function (error) {
          console.log('error  ====  ', error)
        })
      },
      checkOperate (operate) {
        this.tuzaiBatchInfo.checkResultInfo.operatorId = operate.operatorName
        this.showOperate = false
      },
      afterRead1 (oneFile) {
        this.uploadImgShow = true
        console.log('oneFile  === ', oneFile)
        let _this = this
        var fromData = new FormData()
        fromData.append('fileName', oneFile.file.name)
        fromData.append('file', oneFile.file)

        apis.request(tuzhaManager.upload, fromData).then(function (res) {
          _this.uploadImgShow = false
          console.log('res  ===  ', res)
          if (res.data.result.resultCode === '000000') {
            _this.tuzaiBatchInfo.checkResultInfo.asfCheckResultFileId = res.data.fileId
          } else {
            _this.errTips = res.data.result.resultDescription
            _this.show = true
          }
        }).catch(function (error) {
          _this.uploadImgShow = false
          console.log('error  ====  ', error)
        })
      },
      formateTime (val) {
        return util.formaTime(val)
      },
      camera () {
        util.camera((fileEntry) => {

        })
      },
      check () {
        if (!this.tuzaiBatchInfo.checkResultInfo.sampleCount) {
          Toast('请输入采样数量')
          return false
        }
        if (!this.tuzaiBatchInfo.checkResultInfo.sampleId) {
          Toast('请输入采样编号')
          return false
        }
        if (!this.tuzaiBatchInfo.checkResultInfo.jianyiNumId) {
          Toast('请输入检疫证编号')
          return false
        }
        if (this.tuzaiBatchInfo.checkResultInfo.operatorId === '输入采样人姓名') {
          Toast('请选择采样人')
          return false
        }
        if (!this.tuzaiBatchInfo.checkResultInfo.asfCheckResultFileId) {
          Toast('请上传非洲猪瘟检测报告单')
          return false
        }
        return true
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
      submit () {
        if (!this.roughWeight || this.roughWeight === 0) {
          Toast('请输入毛重')
          return
        }
        if (!this.netWeight || this.netWeight === 0) {
          Toast('请输入净重')
          return
        }
        let _this = this
        let a = {}
        a.grossWeight = this.roughWeight
        a.tareWeight = this.netWeight
        a.netWeight = String(Number(this.roughWeight) - Number(this.netWeight))
        a.batchId = this.checkBatchInfo.batchId
        a.batchCode = this.checkBatchInfo.batchCode
        apis.request(tuzhaManager.modifyBatchInfo, { tuzaiBatchInfo: a }).then(function (res) {
          _this.roughWeight = ''
          _this.netWeight = ''
          _this.showEditWeight = false
          _this.getBatchList()
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
      editResult (batchInfo) {
        this.showEditResult = true
        this.tuzaiBatchInfo = {
          checkResultInfo: {
            sampleId: batchInfo.checkResultInfo.sampleId,
            sampleRate: '5',
            sampleCount: batchInfo.checkResultInfo.sampleCount === 0 ? '' : batchInfo.checkResultInfo.sampleCount,
            jianyiNumId: batchInfo.checkResultInfo.jianyiNumId,
            operatorId: batchInfo.checkResultInfo.operatorId ? batchInfo.checkResultInfo.operatorId : '输入采样人姓名',
            clenCheckResult: batchInfo.checkResultInfo.clenCheckResult === 0 ? 1 : 2,
            rhciCheckResult: batchInfo.checkResultInfo.clenCheckResult === 0 ? 1 : 2,
            salCheckResult: batchInfo.checkResultInfo.clenCheckResult === 0 ? 1 : 2,
            asfCheckResult: batchInfo.checkResultInfo.clenCheckResult === 0 ? 1 : 2,
            asfCheckResultFileId: batchInfo.checkResultInfo.asfCheckResultFileId
          }
        }
        this.checkBatchInfo = batchInfo
      },
      editWeight (batchInfo) {
        this.showEditWeight = true
        this.checkBatchInfo = batchInfo
        this.roughWeight = batchInfo.grossWeight
        this.netWeight = batchInfo.tareWeight
      },
      close () {
        this.showEditResult = false
        this.showEditWeight = false
        this.showOperate = false
        this.show = false
      },
      closeTip () {
        this.show = false
      },
      closeOperate () {
        this.showOperate = false
      },
      changeChecks () {
        if (this.isType === 0) {
          let data = []
          for (var i = 0; i < this.checks.length; i++) {
            if (this.checks[i]) {
              data.push(this.batchInfos[i])
            }
          }
          this.$emit('get', data)
        }
      },
      selectOperate () {
        this.getOperateList()
      },
      getOperateList () {
        let _this = this
        apis.request(tuzhaManager.queryOperatorInfos, { operatorType: 2, status: 1 }).then(function (res) {
          console.log('res  ===  ', res)
          if (res.data.result.resultCode === '000000') {
            if (res.data.operatorInfos && res.data.operatorInfos.length > 0) {
              _this.operateArray = res.data.operatorInfos
              _this.showOperate = true
            }
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

.tips3{
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
  .van-col{
    font-size: 17px
  }
    font-size: 18px;
  .content{
margin-top:20px;
  }
  padding: 20px;
}
.van-popup{
    border-radius: 8px;
}
  .second_col{
float: right;
img{
      height: 26px;
    width: 26px;
    float: right;
    margin-right: 20px;
    /* margin-top: auto; */
    /* margin-bottom: auto; */
    margin-top: 12px;
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
.van-dropdown-menu{
  background-color: transparent
}
.hasPhoto{
  color: #3b3be8
}
.noHasPhoto{
color: #393939
}
</style>
