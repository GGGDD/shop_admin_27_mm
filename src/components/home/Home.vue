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
          :unique-opened='true'
        >
        <!-- 一级菜单 , 使用meun的数据进行遍历 -->
          <el-submenu  :index="menu.id+''" v-for='menu in meuns' :key='menu.id'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menu.authName}}</span>
            </template>
            <el-menu-item-group>

              <el-menu-item :index="menu2.path" v-for='menu2 in menu.children' :key='menu2.id'>
                <i class="el-icon-menu"></i>
                {{menu2.authName}}
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
  created () {
    this.getMenu()
  },
  data () {
    return {
      // 菜单列表数据
      meuns: []
    }
  },

  methods: {
    // 动态获取菜单数据
    async getMenu () {
      const res = await this.$http.get('menus')
      // console.log('66666', res)
      this.meuns = res.data.data
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
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
