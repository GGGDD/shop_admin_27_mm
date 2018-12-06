<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="users-nav">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-table
    :data="rightData"
    style="width: 100%">
    <!-- type='index'  表示该列为索引列 -->
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="层级">
      <!-- 显示 层级 -->
      <template slot-scope='scope'>
        <span v-if='scope.row.level === "0"'>一级</span>
        <span v-else-if='scope.row.level === "1"'>二级</span>
        <span v-else>三级</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightData: []
    }
  },
  methods: {
    getIndex (index) {
      return index
    }
  },
  async created () {
    const res = await this.$http.get(`/rights/list`)
    console.log(res)
    this.rightData = res.data.data
  }
}
</script>

<style scoped>
 .users-nav{
    height: 40px;
    line-height: 40px;
    background-color: azure;
    margin: 20px 0;
    padding-left: 10px;
  }
</style>
