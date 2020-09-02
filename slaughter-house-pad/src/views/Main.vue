<template>
  <div>
    <Item1 v-show="active == 0"></Item1>
    <Item2 v-show="active == 1"></Item2>
    <Item3 v-show="active == 2"></Item3>
    <Item4 v-show="active == 3"></Item4>
    <Item5 v-show="active == 4"></Item5>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" class="tabbr-item"
        >实时状态</van-tabbar-item
      >
      <van-tabbar-item icon="search" class="tabbr-item"
        >巡检异常</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" class="tabbr-item"
        >测量操作</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" class="tabbr-item"
        >设备异常</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" class="tabbr-item"
        >视频监控</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from "vant";
import Item1 from "./Item1";
import Item2 from "./Item2";
import Item3 from "./Item3";
import Item4 from "./Item4";
import Item5 from "./Item5";

export default {
  name: "Main",
  components: {
    Item1,
    Item2,
    Item3,
    Item4,
    Item5
  },
  data() {
    return {
      active: 0
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.tabbr-item {
  margin-left: auto;
  margin-right: auto;
}
</style>
