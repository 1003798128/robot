<template>
  <div>
    <div v-for="(batchInfo,index) in batchInfos" :key="index" class="item">
      <div class="first">
        <span>血码：</span><span>{{ batchInfo.BloodCode }}</span>
        <div class="line" />
        <span>批次号：</span><span>{{ batchInfo.BatchNo }}</span>
        <div class="line" />
        <span>货主：</span><span>{{ batchInfo.shipper }}</span>
        <span class="right_btn">{{ isType ==0?'待下发':isType == 1?'已下发':'不合格' }}</span>
      </div>
      <div class="second">
        <span class="first_span">检疫证数量(头):</span><span class="second_span">{{ batchInfo.quarantineCertificateNum }}</span>
        <span class="first_span">到场数量(头):</span><span class="second_span">{{ batchInfo.presentNumber }}</span>
        <span class="first_span">来源:</span><span class="second_span">{{ batchInfo.origin }}</span>
        <span class="first_span">创建日:</span><span class="second_span">{{ batchInfo.createDate }}</span>
        <span class="first_span">毛重(Kg):</span><span class="second_span">{{ batchInfo.roughWeight }}</span>
        <span class="first_span">生猪净重(Kg):</span><span class="second_span">{{ batchInfo.netWeight }}</span>
        <span class="first_span">检测结果:</span><span class="second_span">{{ batchInfo.testResult }}</span>
      </div>
      <div class="heng_line"></div>
      <div v-if="isType==0" class="third">
        <van-checkbox v-model="checks[index]">
          <img
            slot="icon"
            slot-scope="props"
            :src="props.checked ? icon.active : icon.inactive"
          >
        </van-checkbox>
        <div style="float: right;
    position: relative;
    bottom: 36px;">
          <el-button plain >编辑检测结果</el-button>
          <el-button plain>编辑重量</el-button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Title',
    props: {
      isType: {
        type: Object,
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
          active: '../assets/images/icon-unselect.png',
          inactive: '../assets/images/icon-select.png'
        },
        multipleSelection: []
      }
    },
    created () {
      let batchInfo = {
        'BloodCode': '0566',
        'BatchNo': '201907031204',
        'shipper': '王小虎',
        'quarantineCertificateNum': '50',
        'presentNumber': '50',
        'origin': '自营',
        'createDate': '2019/08/07',
        'roughWeight': '5000',
        'netWeight': '4000',
        'testResult': '合格'
      }
      for (var i = 0; i < 10; i++) {
        this.batchInfos.push(batchInfo)
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
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

</style>
