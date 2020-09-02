<template>
  <div>
    <Head :type="3" />
    <div class="wrapper">
      <div class="item-head">
        <span class="head_txt">信息</span>
      </div>
      <van-cell-group>
        <van-field v-model="value" label="车型" placeholder="车型" clearable />
        <van-field v-model="value" label="车号" placeholder="车号" clearable />
        <van-field v-model="value" label="股道" placeholder="股道" clearable />
        <van-field v-model="value" label="端位" placeholder="端位" clearable />
      </van-cell-group>
      <div class="item-head">
        <span class="head_txt">测量</span>
      </div>
      <van-cell-group>
        <van-cell
          title="升弓时间测试"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
        <van-cell
          title="升弓压力测试"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
        <van-cell
          title="降弓时间测试"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
        <van-cell
          title="炭滑板厚度测试"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="item-head">
        <span class="head_txt">设备</span>
      </div>
      <van-cell-group>
        <van-cell
          title="悬臂"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
        <van-cell
          title="润滑系统"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
        <van-cell
          title="刷头"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
        <van-cell
          title="超声波清洗"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
        <van-cell
          title="清洗剂供给"
          label="Text(注意事项)"
          class="vg-vc"
          @click="showSgTimeShow"
        >
          <template #right-icon>
            <van-icon name="star" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-popup
      v-model="sgtimeShow"
      round
      closeable
      position="bottom"
      :close-on-click-overlay="false"
    >
      <Item3BodyPop />
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import Head from "@/components/Head";
import Item3BodyPop from '@/components/Item3BodyPop'
export default {
  name: "Item3",
  components: { Head, Item3BodyPop },
  data () {
    return {
      sgtimeShow: false
    };
  },
  created () { },
  methods: {
    showSgTimeShow () {
      this.sgtimeShow = true
    }
  }
};
</script>
<style lang="scss" scoped>
.item-head {
  background: #f1f2f4;
  height: 40px;
  .head_txt {
    font-size: 18px;
    font-weight: 800;
    margin-left: 20px;
    margin-top: 10px;
  }
}
.vg-vc {
  .van-icon {
    line-height: inherit;
    color: blue;
  }
}

.wrapper {
  height: 85vh;
}
</style>
