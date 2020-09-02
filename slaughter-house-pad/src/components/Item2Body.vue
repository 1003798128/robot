<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="content" @click="detail" v-for="pic in imgList" :key="pic">
          <van-image
            width="80"
            height="80"
            class="pic"
            style="margin-top:10px;margin-left:10px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            @click.stop="showImg()"
          />
          <div class="txt" style="padding-top: 10px;">
            车顶异常识别
          </div>
          <div class="txt">HXD2B0016 2号绝缘子顶部螺栓松动</div>
          <div class="txt">位置：A端 时间：2020/05/09 15:14</div>
          <div class="txt">流程：绝缘子清洗1</div>
          <van-divider style="margin: 10px 0px 0px;" />
        </div>
      </van-list>
    </van-pull-refresh>
    <van-image-preview
      v-model="imgShow"
      :images="['https://img.yzcdn.cn/vant/cat.jpeg']"
    />
    <van-popup
      v-model="detailShow"
      round
      style="width: 80%;"
      :close-on-click-overlay="false"
    >
      <div class="detail">
        <div
          style="font-size: 18px;
    font-weight: 700;
    text-align: center;"
        >
          故障处理
        </div>
        <van-image
          width="80%"
          style="margin-left:10%"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="txt">
          报警：
          <select name="public-choice" v-model="value1" @change="getSelect">
            <option
              v-for="(coupon, index) in option1"
              :key="index"
              :value="coupon.name"
              >{{ coupon.name }}</option
            >
          </select>
        </div>
        <div class="txt">
          异常：
          <select name="public-choice" v-model="value2" @change="getSelect">
            <option
              v-for="(coupon, index) in option2"
              :key="index"
              :value="coupon.name"
              >{{ coupon.name }}</option
            >
          </select>
        </div>
        <div class="txt">时间：2020/05/09 15:14</div>
        <div class="txt">位置：A端</div>
        <div class="txt">流程：绝缘子清洗1</div>
        <van-divider style="    margin: 5px 0px 0px;" />
        <div class="bottom">
          <div style="float:left" @click="handleSuccess">处理完成</div>
          <div
            style="    width: 0.5px;
    height: 100%;
    background: #ebedf0;
    float: left;
"
          />
          <div style="float:right" @click="goHandle">去处理</div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="detailSuccessShow"
      round
      style="width: 80%;"
      :close-on-click-overlay="false"
    >
      <div class="detail">
        <div
          style="font-size: 18px;
    font-weight: 700;
    text-align: center;"
        >
          故障处理
        </div>
        <van-image
          width="80%"
          style="margin-left:10%"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="txt">报警：{{ value1 }}</div>
        <div class="txt">异常：{{ value2 }}</div>
        <div class="txt">时间：2020/05/09 15:14</div>
        <div class="txt">位置：A端</div>
        <div class="txt">流程：绝缘子清洗1</div>
        <van-divider style="    margin: 5px 0px 0px;" />
        <div class="bottom">
          <div style="float:left" @click="handleBack">返回</div>
          <div
            style="    width: 0.5px;
    height: 100%;
    background: #ebedf0;
    float: left;
"
          />
          <div style="float:right" @click="alreadyHandle">已确认</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  name: "Item4Body",
  components: {},
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      detailSuccessShow: false,
      detailShow: false,
      imgShow: false,
      value1: { name: "报警1" },
      value2: { name: "异常1" },
      option1: [{ name: "报警1" }, { name: "报警2" }],
      option2: [{ name: "异常1" }, { name: "异常2" }],
      imgList: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26
      ],
      loading: false,
      refreshing: false,
      finished: false
    };
  },
  created() {},
  methods: {
    handleBack() {
      this.detailShow = true;
      this.detailSuccessShow = false;
    },
    alreadyHandle() {
      this.detailSuccessShow = false;
      Toast.success("操作成功");
    },
    getSelect() {},
    handleSuccess() {
      this.detailShow = false;
      this.detailSuccessShow = true;
    },
    goHandle() {
      this.detailShow = false;
    },
    onLoad() {},
    onRefresh() {},
    showImg() {
      this.imgShow = true;
    },
    detail() {
      this.detailShow = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  min-height: 100px;
  padding-left: 20px;
  padding-right: 20px;
  background: white;
  line-height: 20px;
  font-size: 14px;
  .txt {
    font-size: 13px;
    margin-left: 100px;
  }
}
.detail {
  .txt {
    margin-left: 10%;
    margin-right: 10%;
    line-height: 30px;
    font-size: 16px;
  }
  .bottom {
    color: #1989fa;
    height: 44px;
    line-height: 44px;
    div {
      text-align: center;
      width: 49.8%;
      font-size: 18px;
      font-weight: 500;
      background: white;
    }
  }
}
</style>
