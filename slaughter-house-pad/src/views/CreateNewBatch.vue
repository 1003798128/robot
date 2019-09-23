<template>
  <div>
    <div>
      <div class="no_scroll">
        <titleBar></titleBar>
        <van-nav-bar
          title="创建批次"
          left-arrow
          left-text="返回"
          @click-left="onClickLeft"
        />
      </div>
      <div class="content">
        <div class="tips">
          <van-row>
            <van-col class="first" span="11" >
              <div :class="[{'class1':tuzaiBatchInfo.tuzaiType==2},{'class2':tuzaiBatchInfo.tuzaiType!=2}]" style="    border-bottom-left-radius: 4px;    border-top-left-radius: 4px;" class="class1" @click="setType1"><span>自营</span><img v-show="tuzaiBatchInfo.tuzaiType==2" src="../assets/img/icon-Check.png" /></div>
              <div :class="[{'class1':tuzaiBatchInfo.tuzaiType==1},{'class2':tuzaiBatchInfo.tuzaiType!=1}]" style="    border-bottom-right-radius: 4px;    border-top-right-radius: 4px;" @click="setType2"><span>代宰</span><img v-show="tuzaiBatchInfo.tuzaiType==1" src="../assets/img/icon-Check.png" /></div>
            </van-col>
            <van-col span="11" class="span8 second_col text" @click.native="selectSupply">
              <span>{{ tuzaiBatchInfo.supplyInfo.name }}</span>
              <van-icon name="arrow-down" />
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="11" class="span8" style="border:inherit;padding-left:0px">
              <el-input v-model="tuzaiBatchInfo.blood" type="Number" placeholder="输入血码"></el-input>
            </van-col>
            <van-col span="11" class="span8 second_col text" style="border:inherit;padding-left:0px">
              <van-row>
                <van-col style="border:inherit;padding-left:0px" span="13" class="span8">
                  <el-input v-model="tuzaiBatchInfo.countInquarantine" placeholder="检疫证数量(头)" type="number"></el-input>
                </van-col>
                <van-col style="border:inherit;padding-left:0px" span="10" class="span8 second_col text">
                  <el-input v-model="tuzaiBatchInfo.arrivedCount" placeholder="到场数量(头)" type="number"></el-input>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="11" class="span8 text" >
              <van-uploader :after-read="afterRead1">
                <span :class="[{'hasPhoto':tuzaiBatchInfo.checkResultInfo.checkResultFileId},{'noHasPhoto':!tuzaiBatchInfo.checkResultInfo.checkResultFileId}]">上传检疫合格证</span>
                <img v-if="!tuzaiBatchInfo.checkResultInfo.checkResultFileId" src="../assets/img/icon-camera.png" />
                <img v-else src="../assets/img/c-blue.png" />
              </van-uploader>
            </van-col>
            <van-col span="11" class="span8 second_col text" >
              <van-uploader :after-read="afterRead2">
                <span :class="[{'hasPhoto':tuzaiBatchInfo.checkResultInfo.certificateResultFileId},{'noHasPhoto':!tuzaiBatchInfo.checkResultInfo.certificateResultFileId}]">上传消毒凭证</span>
                <img v-if="!tuzaiBatchInfo.checkResultInfo.certificateResultFileId" src="../assets/img/icon-camera.png" />
                <img v-else src="../assets/img/c-blue.png" />
              </van-uploader>
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="24" class="span8" style="border:inherit;padding-left:0px">
              <el-input v-model="tuzaiBatchInfo.earTag" placeholder="填写耳标信息(多条耳标记录信息请用分号隔开)"></el-input>
            </van-col>
          </van-row>
          <van-row class="top">
            <van-col span="11" class="span8" style="border:inherit;padding-left:0px">
              <el-input v-model="tuzaiBatchInfo.grossWeight" type="Number" placeholder="输入生猪毛重(非必填)"></el-input>
            </van-col>
            <van-col span="11" style="border:inherit;padding-left:0px" class="span8 second_col">
              <el-input v-model="tuzaiBatchInfo.tareWeight" type="Number" placeholder="输入生猪皮重(非必填)"></el-input>
            </van-col>
          </van-row>
        </div>
        <div>
        </div>
      </div>
      <div style="width: 100%;
    text-align: center;">
        <van-button type="info" @click="submit">确定</van-button>
        <van-button type="info" style="margin-left:10px" @click="ReSet">重置</van-button>
      </div>
      <van-popup v-model="showSupply" :close-on-click-overlay="false">
        <div class="tips2">
          <div class="tips_title">
            <span>选择货主</span>
            <van-icon color="white" name="cross" @click="close"/>
          </div>
          <div class="tips_body">
            <div v-for="(supp,index) in suppArray" :key="index" >
              <van-cell :title="supp.name" @click="checkSupply(supp)"/>
            </div>
        </div>  </div>
      </van-popup>
      <van-popup v-model="show" :close-on-click-overlay="false">
        <div class="tips2">
          <div class="tips_title">
            <span>提示</span>
            <van-icon color="white" name="cross" @click="close"/>
          </div>
          <div class="tips_body">
            <img src="../assets/img/icon_tips.png">
            <div class="content">
              {{ errorTip }}
            </div>
            <van-button size="large" plain round @click="close">关闭</van-button>
          </div>
        </div>
      </van-popup>
    </div>
    <van-loading v-if="uploadImgShow" size="30px" text-size="30px" vertical>上传图片中，请稍等...</van-loading>
  </div>
</template>
<script>
  // import config from '../apis/config'
  import titleBar from '@/components/TitleBar.vue'
  import apis from '@/apis/index'
  import tuzhaManager from '@/apis/cloudStorageApi'
  import { Toast } from 'vant'
  import { eventBus } from '@/utils/eventBus'
  // import getFirstLetter from 'pinyin-firstletter'
  // import alphabetSortList from 'vue-alphabet-sort'
  export default {
    name: 'Detail',
    components: {
      'titleBar': titleBar
    },
    data () {
      return {
        labelPosition: 0,
        tuzaiBatchInfo: {
          tuzaiType: 1,
          supplyInfo: {
            name: '选择货主'
          },
          blood: '', // 血码
          countInquarantine: '',
          arrivedCount: '', // 到场数量
          checkResultInfo: {
            checkResultFileId: '', // 检疫证文件ID
            certificateResultFileId: ''// 消毒凭证文件ID
          },
          earTag: '', // 耳标信息
          grossWeight: '', // 毛重
          tareWeight: ''// 皮重
        },
        showSupply: false,
        show: false,
        errorTip: '',
        suppArray: [],
        uploadImgShow: false
      }
    },
    created () {
    },
    methods: {
      submit () {
        let _this = this
        if (!this.check()) {
          return true
        }
        if (this.tuzaiBatchInfo.grossWeight !== '') {
          if (this.tuzaiBatchInfo.tareWeight !== '') {
            this.tuzaiBatchInfo.netWeight = Number(this.tuzaiBatchInfo.grossWeight) - Number(this.tuzaiBatchInfo.tareWeight)
          } else {
            this.tuzaiBatchInfo.netWeight = this.tuzaiBatchInfo.grossWeight
          }
        }
        this.tuzaiBatchInfo.diedCount = Number(this.tuzaiBatchInfo.countInquarantine) - Number(this.tuzaiBatchInfo.arrivedCount)
        apis.request(tuzhaManager.createBatchInfo, { 'tuzaiBatchInfo': this.tuzaiBatchInfo }).then(function (res) {
          console.log('res  ===  ', res)
          if (res.data.result.resultCode === '000000') {
            eventBus.$emit('fresh')
            _this.$router.go(-1)
          } else {
            _this.errTips = res.data.result.resultDescription
            _this.show = true
          }
        }).catch(function (error) {
          console.log('error  ====  ', error)
        })
      },
      check () {
        if (this.tuzaiBatchInfo.supplyInfo.name === '选择货主') {
          Toast('请选择货主')
          return false
        }
        if (!this.tuzaiBatchInfo.blood) {
          Toast('请输入血码')
          return false
        }
        if (!this.tuzaiBatchInfo.countInquarantine) {
          Toast('请输入检疫证数量')
          return false
        }
        if (!this.tuzaiBatchInfo.arrivedCount) {
          Toast('请输入到场数量')
          return false
        }
        if (!this.tuzaiBatchInfo.checkResultInfo.checkResultFileId) {
          Toast('请上传检疫证照片')
          return false
        }
        if (!this.tuzaiBatchInfo.checkResultInfo.certificateResultFileId) {
          Toast('请上传消毒凭证照片')
          return false
        }
        if (!this.tuzaiBatchInfo.earTag) {
          Toast('请输入耳标信息')
          return false
        }
        if ((Number(this.tuzaiBatchInfo.countInquarantine) - Number(this.tuzaiBatchInfo.arrivedCount)) < 0) {
          Toast('检疫证数量不能小于到场数量')
          return false
        }
        return true
      },
      ReSet () {
        this.tuzaiBatchInfo = {
          tuzaiType: 1,
          supplyInfo: {
            name: '选择货主'
          },
          blood: '', // 血码
          countInquarantine: '',
          arrivedCount: '', // 到场数量
          checkResultInfo: {
            checkResultFileId: '', // 检疫证ID
            certificateResultFileId: ''// 消毒凭证ID
          },
          earTag: '', // 耳标信息
          grossWeight: '', // 毛重
          tareWeight: ''// 皮重
        }
      },
      checkSupply (suppInfo) {
        this.showSupply = false
        this.tuzaiBatchInfo.supplyInfo = suppInfo
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
            _this.tuzaiBatchInfo.checkResultInfo.checkResultFileId = res.data.fileId
          } else {
            _this.errTips = res.data.result.resultDescription
            _this.show = true
          }
        }).catch(function (error) {
          _this.uploadImgShow = false
          console.log('error  ====  ', error)
        })
      },
      afterRead2 (oneFile) {
        console.log('oneFile  === ', oneFile)
        let _this = this
        this.uploadImgShow = true
        var fromData = new FormData()
        fromData.append('fileName', oneFile.file.name)
        fromData.append('file', oneFile.file)

        apis.request(tuzhaManager.upload, fromData).then(function (res) {
          _this.uploadImgShow = false
          console.log('res  ===  ', res)
          if (res.data.result.resultCode === '000000') {
            _this.tuzaiBatchInfo.checkResultInfo.certificateResultFileId = res.data.fileId
          } else {
            _this.errTips = res.data.result.resultDescription
            _this.show = true
          }
        }).catch(function (error) {
          _this.uploadImgShow = true
          console.log('error  ====  ', error)
        })
      },
      selectSupply () {
        this.getSupplyList()
      },
      getSupplyList () {
        let _this = this
        apis.request(tuzhaManager.querySupplyInfos, { name: '' }).then(function (res) {
          console.log('res  ===  ', res)
          if (res.data.result.resultCode === '000000') {
            if (res.data.supplyInfos && res.data.supplyInfos.length > 0) {
              _this.showSupply = true
              _this.pySegSort(res.data.supplyInfos)
            }
          } else {
            _this.errTips = res.data.result.resultDescription
            _this.show = true
          }
        }).catch(function (error) {
          console.log('error  ====  ', error)
        })
      },
      setType1 () {
        this.tuzaiBatchInfo.tuzaiType = 2
      },
      setType2 () {
        this.tuzaiBatchInfo.tuzaiType = 1
      },
      onClickLeft () {
        this.$router.go(-1)
      },
      close () {
        this.showSupply = false
        this.show = false
      },
      pySegSort (arr) {
        // let suppArray = []
        // for (var i = 0; i < arr.length; i++) {
        //   arr[i].firstLetter = getFirstLetter(arr[i].name).subString(0, 1)
        // }
        this.suppArray = arr
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
.main{
 & /deep/ .van-popup--center{
  width:500px !important;
}
}

.first{
    padding-left: 0px !important;
    border: none !important;
    img{
      height: 26px;
    width: 26px;
    float: right;
    margin-right: 20px;
    /* margin-top: auto; */
    /* margin-bottom: auto; */
    margin-top: 12px;
}
.class1{
float:left;
width: 49%;
    text-align: center;
    color: #6B98FF;
    border: 1px #6B98FF solid;
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
  float: initial !important;
  margin-left: 10px;
}
}
.class2{
float:left;
width: 49%;
    text-align: center;
    color: #393939;
    border: 1px #E4E7EC solid;
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
   float: initial !important;
  margin-left: 10px;
}
}
}

.content{
  // height: calc(100vh - 120px);
  overflow: auto;
  border: 1px #E4E7EC solid;
  margin: 16px;
  // overflow: scroll;
  margin-top: 8px;
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
  float: right;
  margin-right: 20px;
  line-height: 50px;
}
  .top{
    margin-top: 14px;
  }

}
.tips{

  font-size: 20px;
  margin:20px;
  width: 70%;
  // margin-top: 8px;
  // margin-bottom: 8px;
  color: #393939;
  margin-left: auto;
    margin-right: auto;
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

.second_col{
float: right
}
.text{
  padding-left: 20px;
}
.no_scroll{
  font-size: 20px
}
.van-button--normal {
    padding: 0 40px;
    font-size: 20px;
    border-radius: 6px;
}

.tips2{
  width: 300px;
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
  max-height: 300px;
  margin-top: 60px;
  .content{
margin-top:20px;
  }
}
.van-popup{
    border-radius: 8px;
}
.tips_title{
  padding:12px;
  background-color:#3b3be8;
  color:white;
  position: fixed;
  width:100%;
  top:0;
  .van-icon{
    float: right;
    margin-right: 20px;
  }
}
}
.hasPhoto{
  color: #3b3be8
}
.noHasPhoto{
color: #393939
}
</style>
