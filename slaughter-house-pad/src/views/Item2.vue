<template>
  <div>
    <Head name="巡检异常" :type="2" />
    <div>
      <van-tabs v-model="active">
        <van-tab class="wrapper4" title="未处理"> <Item2Body key="1"/></van-tab>
        <van-tab title="处理中" class="wrapper4"><Item2Body key="2"/></van-tab>
        <van-tab title="处理完成" class="wrapper4"
          ><Item2Body key="3"
        /></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import Head from "@/components/Head";
import Item2Body from "@/components/Item2Body";

export default {
  name: "Item4",
  components: { Head, Item2Body },
  data() {
    return {
      active: 0
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped></style>
