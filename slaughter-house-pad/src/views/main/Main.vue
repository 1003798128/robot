<template>
  <div>
    <titleBar></titleBar>
    <div class="body">
      <div>
        <el-radio-group v-model="labelPosition" size="large">
          <el-radio-button label="0">待下发</el-radio-button>
          <el-radio-button label="1">已下发</el-radio-button>
          <el-radio-button label="2">不合格</el-radio-button>
        </el-radio-group>

        <div style="float: right;">
          <el-button type="primary">创建批次</el-button>
          <el-button v-if="labelPosition == 0" type="primary">下发屠宰队列</el-button>
          <el-button v-if="labelPosition == 0" type="primary" icon="el-icon-edit-outline">编辑</el-button>
          <el-button v-if="labelPosition == 0" type="primary">删除</el-button>
        </div>
      </div>
      <van-divider />
      <mainTable v-if="labelPosition == 0" is-type="0"></mainTable>
      <mainTable v-if="labelPosition == 1" is-type="1"></mainTable>
      <mainTable v-if="labelPosition == 2" is-type="2"></mainTable>
    </div>
  </div>
</template>
<script>
  // import config from '../apis/config'
  import titleBar from '@/components/TitleBar.vue'
  import mainTable from '@/components/MainTable.vue'

  export default {
    name: 'Login',
    components: {
      'titleBar': titleBar,
      'mainTable': mainTable
    },
    data () {
      return {
        labelPosition: 0
      }
    },
    created () {
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
.body{
  padding: 20px;
  .van-divider{
    border-color: #999;
  }
}

</style>
