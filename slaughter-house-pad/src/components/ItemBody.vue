<template>
  <div>
    <van-divider style="margin:0;margin-bottom:10px" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="content" @click="detail" v-for="pic in imgList" :key="pic">
        <van-col span="24">
          <van-image
            width="80"
            height="80"
            class="pic"
            style="margin-top:10px;margin-left:10px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            @click.stop="showImg()"
          />
          <div class="txt">
            当前"列车编号"对应作业(已完成的)
          </div>
          <div class="txt">1245 J8股道 A端</div>
          <div class="txt">2020/05/09 15:14</div>
          <van-divider
            style="    margin: 10px 0px 0px;
  "
          />
        </van-col>
      </div>
    </van-list>
    <van-image-preview
      v-model="imgShow"
      :images="['https://img.yzcdn.cn/vant/cat.jpeg']"
    />
    <van-popup
      v-model="detailShow"
      round
      style="width: 80%;line-height:initial"
      :close-on-click-overlay="false"
    >
      <div class="detail">
        <van-steps :active="3">
          <van-step>碳滑板厚度1点位拍照</van-step>
          <van-step>碳滑板厚度2点位拍照</van-step>
          <van-step>碳滑板厚度3点位拍照</van-step>
        </van-steps>
        <van-steps :active="2">
          <van-step>B端碳滑板厚度4点位拍照</van-step>
          <van-step>测量受电弓升弓时间</van-step>
          <van-step>测量受电弓压力测试</van-step>
        </van-steps>
        <div class="bottom">
          <div @click="handleSuccess">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "ItemBody",
  components: {},
  props: {

  },
  data () {
    return {
      detailShow: false,
      imgShow: false,
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
      finished: false
    };
  },
  created () { },
  methods: {
    handleSuccess () {
      this.detailShow = false;
      Toast.success("操作成功");
    },
    goHandle () {
      this.detailShow = false;
    },
    onLoad () { },
    showImg () {
      this.imgShow = true;
    },
    detail () {
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
    margin-top: 10px;
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
