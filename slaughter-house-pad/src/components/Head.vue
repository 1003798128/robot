<template>
  <div>
    <div class="head">
      <van-icon
        @click="show = true"
        name="apps-o"
        style="margin-left: 20px;
    margin-top: 10px;"
      />
    </div>
    <van-divider style="margin:0" />
    <div v-if="type != 3" class="item-head">
      <span
        style="font-size: 18px;
    font-weight: 800;
    margin-left:20px;
    margin-top:10px"
        >{{ name }}</span
      >

      <van-dropdown-menu
        v-if="type != 5"
        style="margin-right:20px;margin-top:5px"
      >
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </div>
    <van-popup
      class="head_pop"
      v-model="show"
      position="left"
      :style="{ height: '100%' }"
    >
      <div class="line">
        车型：<select name="public-choice" v-model="value2" @change="getSelect">
          <option
            v-for="(coupon, index) in option2"
            :key="index"
            :value="coupon.name"
            >{{ coupon.name }}</option
          >
        </select>
      </div>
      <div class="line">
        车号：<select name="public-choice" v-model="value3" @change="getSelect">
          <option
            v-for="(coupon, index) in option3"
            :key="index"
            :value="coupon.name"
            >{{ coupon.name }}</option
          >
        </select>
      </div>
      <div class="line">
        股道：<select name="public-choice" v-model="value4" @change="getSelect">
          <option
            v-for="(coupon, index) in option4"
            :key="index"
            :value="coupon.name"
            >{{ coupon.name }}</option
          >
        </select>
      </div>
      <div class="line">
        <div style="    float: left">端位：</div>
        <DoubleCheck
          text="A端|B端"
          style="    float: left;
    margin-left: 10px;
    margin-top: 8px;
"
        />
      </div>
      <div style="clear: left;" class="line">
        <span>入库时间：</span>2020-06-17 10:31:00
      </div>
      <div class="line"><span>当前状态：</span>等待状态</div>
      <van-divider style="margin:0" />
      <van-button
        round
        type="primary"
        style="margin-left: 50%;
    transform: translateX(-50%);    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;"
        >故障复位<van-tag round type="danger" style="margin-left: 8px;"
          >9</van-tag
        ></van-button
      >
      <div class="check_div">
        开始作业
        <DoubleCheck
          :isChecked.sync="check1"
          type="1"
          text="ON|OFF"
          style="float: right;
    margin-top: 4px;"
        />
      </div>
      <div class="check_div">
        暂停作业
        <DoubleCheck
          :isChecked.sync="check2"
          type="2"
          text="ON|OFF"
          style="float: right;
    margin-top: 4px;"
        />
      </div>
      <div class="check_div">
        停止作业
        <DoubleCheck
          :isChecked.sync="check3"
          type="3"
          text="ON|OFF"
          style="float: right;
    margin-top: 4px;"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import DoubleCheck from "@/components/DoubleCheck"
export default {
  name: "Item1",
  components: { DoubleCheck },
  props: {
    name: {
      type: String,
      default: ""
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      check1: false,
      check2: false,
      check3: false,
      show: false,
      value1: 0,
      option1: [
        { text: "列车编号1", value: 0 },
        { text: "列车编号2", value: 1 },
        { text: "列车编号3", value: 2 }
      ],
      value2: { name: "车型1" },
      value3: { name: "车号1" },
      value4: { name: '股道1' },
      option2: [{ name: "车型1" }, { name: "车型2" }],
      option3: [{ name: "车号1" }, { name: "车号2" }],
      option4: [{ name: "股道1" }, { name: "股道2" }],
    };
  },
  created () { },
  watch: {
    check1 (val) {
      if (val) {
        this.check1 = val
        this.check2 = false
        this.check3 = false
      }
    },
    check2 (val) {
      if (val) {
        this.check1 = false
        this.check3 = false
        this.check2 = val
      }
    },
    check3 (val) {
      if (val) {
        this.check1 = false
        this.check2 = false
        this.check3 = val
      }
    }
  },
  methods: {
    getSelect () { },  }
};
</script>
<style lang="scss" scoped>
.item-head {
  background: #f1f2f4;
  height: 40px;
}
.head {
  font-size: 24px;
  height: 44px;
}
.head_pop {
  .line {
    margin-left: 20px;
    select {
      font-size: 16px;
      margin-left: 8px;
      height: 24px;
    }
  }
  .check_div {
    margin-top: 16px;
    border: 2px solid #f9f9f9;
    width: 160px;
    border-radius: 18px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
