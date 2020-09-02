<template>
  <div>
    <div
      style="font-weight: 600;
    margin-top: 10px;
    margin-left: 20px;
"
    >
      升工时间测试
    </div>
    <div style="margin-top:10px;margin-left:20px">
      <van-button
        :loading="sgOneTimeLoading"
        type="info"
        loading-type="spinner"
        loading-text="一号升弓时间"
        round
        icon="passed"
      >
        一号升弓时间
      </van-button>
      <van-field
        style="width: 50%;
    float: right;"
        v-model="sgOneTime"
        placeholder="返回测试的时间"
        readonly
      />
    </div>
    <div style="margin-top:10px;margin-left:20px">
      <van-button
        :loading="sgTwoTimeLoading"
        type="info"
        loading-type="spinner"
        loading-text="二号升弓时间"
        round
        icon="passed"
      >
        二号升弓时间
      </van-button>
      <van-field
        style="width: 50%;
    float: right;"
        v-model="sgTwoTime"
        placeholder="返回测试的时间"
        readonly
      />
    </div>
    <div style="margin-top:20px">
      <div
        style="float: left;
    width: 50%;
    text-align: center;"
      >
        <van-button round type="info" @click="sgTimeOneTest"
          >一号受电弓测试</van-button
        >
      </div>
      <div
        style="float: right;
    width: 50%;
    text-align: center;"
      >
        <van-button round type="info" @click="sgTimeTwoTest"
          >二号受电弓测试</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  name: "Item3BodyPop",
  components: {},
  props: {

  },
  data () {
    return {
      sgOneTimeLoading: false,
      sgOneTime: '',
      sgTwoTimeLoading: false,
      sgTwoTime: ''
    };
  },
  created () { },
  methods: {
    sgTimeOneTest () {
      this.sgOneTimeLoading = true
      setTimeout(() => {
        this.sgOneTimeLoading = false
        this.sgOneTime = '20S'
      }, 2000)
    },
    sgTimeTwoTest () {
      this.sgTwoTimeLoading = true
      setTimeout(() => {
        this.sgTwoTimeLoading = false
        this.sgTwoTime = '20S'
      }, 2000)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
