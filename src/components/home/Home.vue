<template>
  <el-container class="home">
    <el-header class="home-header">
      <el-row type="flex" class="row-bg" justify="space-between" align='middle'>
        <el-col :span="6"><img src="../../assets/img/logo.png" alt=""></el-col>
        <el-col :span="6" class="home-title">电商后台管理系统</el-col>
        <el-col :span="6" class="home-right">
          欢迎上海前端27期星曜会员
          <a href="javascript:;" class="hone-right-text" @click='outLogin'>退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router='true'
          default-active="2"
          class="home-header-menu"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>

              <el-menu-item index="/users">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>

            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>

              <el-menu-item index="/roles">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>

              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>

              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
              <el-menu-item index="4-2">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item-group>

              <el-menu-item index="5-1">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
              <el-menu-item index="5-2">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <!-- 必须写上路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 退出登陆
    outLogin () {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="less">
.home {
  height: 100%;
  background-color: #eaeef1;

  &-header {
    background-color: #b3c1cd;

    &-menu {
      height: 100%;
    }

  }
  &-title {
    font-size: 30px;
    color: #fff;
  }

  &-right {
    font-weight: bold;
    &-text {
      color: aquamarine;
    }
  }
}

</style>
