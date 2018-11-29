// 导入Vue
import Vue from 'vue'
// 1 导入路由模块
import Router from 'vue-router'

// 导入自定义组件
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'

// 安装路由插件
Vue.use(Router)

// 2 创建路由实例
const router = new Router({
  routes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login }
  ]
})

export default router
