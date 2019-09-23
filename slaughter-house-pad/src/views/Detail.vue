<template>
  <div>
    <div class="no_scroll">
      <titleBar></titleBar>
      <van-nav-bar
        title="批次详情"
        left-arrow
        left-text="返回"
        right-text="待下发"
        @click-left="onClickLeft"
      />
    </div>
    <div class="content" style="padding-left: 16px;
  padding-right: 16px;overflow: scroll;">
      <div class="detail_tips_title">
        基本信息
      </div>
      <div>
        <van-row>
          <van-col span="4" class="span4">血码</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.blood }}</van-col>
          <van-col span="4" class="span4">批次号</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.batchCode }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">货主</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.supplyInfo.name?tuzaiBatchInfo.supplyInfo.name:'-' }}</van-col>
          <van-col span="4" class="span4">检疫数量证(头)</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.countInquarantine }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">到场数量(头)</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.arrivedCount }}</van-col>
          <van-col span="4" class="span4">图亡数量(头)</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.diedCount }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">来源</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.tuzaiType===1?'代宰':'自营' }}</van-col>
          <van-col span="4" class="span4">创建日期</van-col>
          <van-col span="8" class="span8">{{ formateTime(tuzaiBatchInfo.createTime) }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">毛重(Kg)</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.grossWeight }}</van-col>
          <van-col span="4" class="span4">皮重(Kg)</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.tareWeight }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">生猪净重(Kg)</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.netWeight }}</van-col>
          <van-col span="4" class="span4">平均重量(Kg)</van-col>
          <van-col span="8" class="span8">{{ Math.round(tuzaiBatchInfo.netWeight?tuzaiBatchInfo.netWeight:0 /tuzaiBatchInfo.arrivedCount?tuzaiBatchInfo.arrivedCount:'1' ) }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">耳标信息</van-col>
          <van-col span="20" class="span8">{{ tuzaiBatchInfo.earTag }}</van-col>
        </van-row>
      </div>
      <div class="detail_tips_title">检测信息及结果</div>
      <div>
        <van-row>
          <van-col span="4" class="span4">采样基数</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.checkResultInfo?tuzaiBatchInfo.checkResultInfo.sampleRate + '%':'-' }}</van-col>
          <van-col span="4" class="span4">采样数量</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.checkResultInfo?tuzaiBatchInfo.checkResultInfo.sampleCount:'-' }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">样品编号</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.checkResultInfo?tuzaiBatchInfo.checkResultInfo.sampleId:'-' }}</van-col>
          <van-col span="4" class="span4">生猪来源区域</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.supplyInfo.address?tuzaiBatchInfo.supplyInfo.address:'-' }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">检疫证编号</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.checkResultInfo?tuzaiBatchInfo.checkResultInfo.jianyiNumId:'-' }}</van-col>
          <van-col span="4" class="span4">采样人员姓名</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.checkResultInfo?tuzaiBatchInfo.checkResultInfo.operatorId:'-' }}</van-col>
        </van-row>
        <van-row>
          <van-col span="4" class="span4">瘦肉精检测结果明细</van-col>
          <van-col span="8" class="span8">{{ test2() }}</van-col>
          <van-col span="4" class="span4">非洲猪瘟检测结果</van-col>
          <van-col span="8" class="span8">{{ tuzaiBatchInfo.checkResultInfo?tuzaiBatchInfo.checkResultInfo.asfCheckResult === 1?'阴性':'阳性':'-' }}</van-col>
        </van-row>
        <img v-if="getTestResult===1" class="qua_img" src="../assets/img/icon-qualified.png">
        <img v-if="getTestResult===2
        " class="qua_img" src="../assets/img/icon-unqualified.png">
      </div>
      <div class="detail_tips_title">图片信息</div>
      <div style="padding-bottom:16px">
        <div class="img_div first_div" @click="openImg(img1,'动物检疫合格证明')">
          <van-image v-if="img1" :src="img1" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <img v-else>
          <div>动物检疫合格证明</div>
        </div>
        <div class="img_div" @click="openImg(img2,'非洲猪瘟检测报告单')">
          <van-image v-if="img2" :src="img2" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <img v-else>
          <div>非洲猪瘟检测报告单</div>
        </div>
        <div class="img_div" @click="openImg(img3,'消毒凭证')">
          <van-image v-if="img3" :src="img3" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <img v-else>
          <div>消毒凭证</div>
        </div>
      </div>
    </div>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="tips">
        <div class="tips_title">
          <span>{{ showImg.title }}</span>
          <van-icon color="white" name="cross" style="line-height: inherit;" @click="close" />
        </div>
        <div class="tips_body">
          <img v-lazy="showImg.imgUrl">
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  // import config from '../apis/config'
  import titleBar from '@/components/TitleBar.vue'
  import apis from '@/apis/index'
  import tuzhaManager from '@/apis/cloudStorageApi'
  import util from '@/utils/tools'
  export default {
    name: 'Detail',
    components: {
      'titleBar': titleBar
    },
    data () {
      return {
        batchId: this.$route.query.batchId,
        tuzaiBatchInfo: {},
        img1: '',
        img2: '',
        img3: '',
        showImg: {
          title: '',
          imgUrl: ''
        },
        show: false
      }
    },
    computed: {
      getTestResult () {
        if (!this.tuzaiBatchInfo.checkResultInfo) {
          return 0
        }
        if (this.tuzaiBatchInfo.checkResultInfo.clenCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.rhciCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.salCheckResult === 1 && this.tuzaiBatchInfo.checkResultInfo.asfCheckResult === 1) {
          return 1
        } else {
          return 2
        }
      }
    },
    created () {
      let _this = this
      apis.request(tuzhaManager.queryBatchInfo, { tuzaiBatchId: this.batchId }).then(function (res) {
        console.log('res  ===  ', res)
        if (res.data.result.resultCode === '000000') {
          _this.tuzaiBatchInfo = res.data.tuzaiBatchInfo
          if (res.data.tuzaiBatchInfo && res.data.tuzaiBatchInfo.checkResultInfo) {
            if (res.data.tuzaiBatchInfo.checkResultInfo.checkResultFileId) {
              _this.img1 = 'http://47.103.15.136:8080/filemanage/download?fileId=' + res.data.tuzaiBatchInfo.checkResultInfo.checkResultFileId
            }
            if (res.data.tuzaiBatchInfo.checkResultInfo.asfCheckResultFileId) {
              _this.img2 = 'http://47.103.15.136:8080/filemanage/download?fileId=' + res.data.tuzaiBatchInfo.checkResultInfo.asfCheckResultFileId
            }
            if (res.data.tuzaiBatchInfo.checkResultInfo.certificateResultFileId) {
              _this.img3 = 'http://47.103.15.136:8080/filemanage/download?fileId=' + res.data.tuzaiBatchInfo.checkResultInfo.certificateResultFileId
            }
          }
        }
      }).catch(function (error) {
        console.log('error  ====  ', error)
      })
    },
    methods: {
      close () {
        this.show = false
      },
      openImg (imgUrl, title) {
        if (imgUrl) {
          this.showImg.imgUrl = imgUrl
          this.showImg.title = title
          this.show = true
        }
      },
      test2 () {
        let testStr = ''
        if (!this.tuzaiBatchInfo.checkResultInfo) {
          testStr = '-'
          return testStr
        }
        if (this.tuzaiBatchInfo.checkResultInfo.clenCheckResult === 1) {
          testStr = testStr + '克伦特罗-阴性;'
        } else if (this.tuzaiBatchInfo.checkResultInfo.clenCheckResult === 2) {
          testStr = testStr + '克伦特罗-阳性;'
        }
        if (this.tuzaiBatchInfo.checkResultInfo.rhciCheckResult === 1) {
          testStr = testStr + '莱克多巴胺-阴性;'
        } else if (this.tuzaiBatchInfo.checkResultInfo.rhciCheckResult === 2) {
          testStr = testStr + '莱克多巴胺-阳性;'
        }
        if (this.tuzaiBatchInfo.checkResultInfo.salCheckResult === 1) {
          testStr = testStr + '沙丁胺醇-阴性'
        } else if (this.tuzaiBatchInfo.checkResultInfo.salCheckResult === 2) {
          testStr = testStr + '沙丁胺醇-阳性'
        }
        return testStr
      },
      formateTime (val) {
        return util.formaTime(val)
      },
      onClickLeft () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" scoped>
.qua_img{
float: right;
    position: relative;
    top: -140px;
}
.content{
  height: calc(100vh - 120px);
    overflow: auto;
}
.detail_tips_title{
  font-size: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #393939
}
.van-col {
border: 1px #E4E7EC solid;
    font-size: 16px;
    padding-left:8px;

}
.span4{
background-color: #F6F7F9
}
.span8{

}
.img_div{
  font-size: 16px;
  float: left;
  margin-left: 10px;
  img{
    margin-top: 10px;
    padding: 10px;
    height: 180px;
    width: 180px;
    border: 1px #E4E7EC solid
  }
  div{
    margin-top: 10px;
    text-align: center;
    border: 1px #E4E7EC solid
  }
}
.first_div{
  margin-left: 0px;

}

.van-popup{
    border-radius: 8px;
    width: 80%;

}
.tips{
  img{
    width: 100%;
  }
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
  padding: 20px;
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
