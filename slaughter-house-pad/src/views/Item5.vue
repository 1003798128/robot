<template>
  <div>
    <Head name="视频监控" :type="5" />
    <div class="wrapper">
      <van-grid class="content" :border="false" :column-num="3">
        <van-grid-item v-for="pic in imgList" :key="pic">
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import Head from "@/components/Head";
export default {
  name: "Item4",
  components: { Head },
  data() {
    return {
      i: 0,
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
      ]
    };
  },
  created() {},
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped></style>
