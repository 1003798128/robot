<template>
  <div>
    <Head name="列车信息" :type="1" />
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      style="background:white"
      class="wrapper"
    >
      <div class="content_1">
        <van-col span="12"
          ><span class="left_line">车型：</span
          ><span class="right_line">HXD2B</span></van-col
        >
        <van-col span="12"
          ><span class="left_line">停车位置：</span
          ><span class="right_line">股道</span></van-col
        >
        <van-col span="12"
          ><span class="left_line">车号：</span
          ><span class="right_line">1245</span></van-col
        >
        <van-col span="12"
          ><span class="left_line">机车状态：</span
          ><span class="right_line">已入位</span></van-col
        >
        <van-col span="12"
          ><span class="left_line">端位：</span
          ><span class="right_line">text</span></van-col
        >
        <van-col span="12" style="margin-bottom: 10px;"
          ><span class="left_line">触网通电状态：</span
          ><span class="right_line">已触电</span></van-col
        >
      </div>
      <div class="content_2">
        <van-col span="12"
          ><div class="top_line">A端</div>
          <div class="bottom_line">刷组状态</div></van-col
        >
        <van-col span="12"
          ><div class="top_line">B端</div>
          <div class="bottom_line">刷组状态</div></van-col
        >
        <van-col span="12"
          ><div class="top_line">A端</div>
          <div class="bottom_line">图像识别作业进度</div></van-col
        >
        <van-col span="12"
          ><div class="top_line">B端</div>
          <div class="bottom_line">图像识别作业进度</div></van-col
        >
      </div>
      <div>
        <van-col
          span="24"
          style="background: #f1f2f4;
  height: 40px;"
          ><span
            style="font-size: 18px;
    font-weight: 800;
    margin-left:20px;
    margin-top:10px"
            >机器人历史状态</span
          ></van-col
        >
      </div>
      <ItemBody />
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from "vant";
import Head from "@/components/Head";
import ItemBody from "@/components/ItemBody";

export default {
  name: "Item1",
  components: { Head, ItemBody },
  data () {
    return {
      refreshing: false,
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ]
    };
  },
  created () { },
  methods: {
    onRefresh () { },
  }
};
</script>
<style lang="scss" scoped>
.item-head {
  background: #f1f2f4;
  height: 40px;
}
.content_1 {
  .van-col {
    padding-left: 20px;
    line-height: initial;
    margin-top: 10px;
    .left_line {
      font-size: 15px;
    }
    .right_line {
      font-size: 14px;
      color: gray;
      margin-left: 10px;
    }
  }
}
.content_2 {
  margin-top: 10px;
  .van-col {
    background: #f9f9f9;
    border: 1px solid #f0f0f0;
    text-align: center;
    .top_line {
      font-size: 15px;
      line-height: 28px;
      margin-top: 2px;
    }
    .bottom_line {
      font-size: 13px;
      color: grey;
      height: initial;
      line-height: initial;
      margin-bottom: 14px;
    }
  }
}
</style>
