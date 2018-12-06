// 导入Vue
import Vue from 'vue'
// 1 导入路由模块
import Router from 'vue-router'

// 导入自定义组件
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'
import Users from '@/components/users/Users'
import Roles from '@/components/roles/Roles'
import Rights from '@/components/rights/rights'

// 安装路由插件
Vue.use(Router)

// 2 创建路由实例
const router = new Router({
  routes: [
    {path: '/', redirect: '/home'},
    { path: '/home',
      component: Home,
      children: [

        {path: '/users', component: Users},
        {path: '/roles', component: Roles},
        {path: '/rights', component: Rights}
      ]
    },
    { path: '/login', component: Login }
  ]
})

// beforeEach方法，就是一个导航守卫（ 全局守卫 ）
router.beforeEach((to, from, next) => {
  // 思路：
  // 1 如果访问的是登录页，直接展示登录页面
  if (to.path === '/login') {
    return next()
  }

  // 2 判断有没有登录
  const token = localStorage.getItem('token')
  if (token) {
    // 登录，直接展示当前要访问的路由内容
    next()
  } else {
    // 没有登录，就重新跳转到 登录页面，让用户登录
    next('/login')
  }

  // from 表示从哪来，也就是：当前要离开的路由
  // to   表示到哪去，也就是：要进入的路由
  // next() 一定要调用这个钩子函数，否则页面不会展示任何内容
  // console.log('导航守卫执行了')
  // console.log('to:', to)
  // console.log('from:', from)

  // 如果直接调用 next() 就表示：直接展示当前要访问的路由内容
  // next()

  // 参数：表示要跳转到的路由规则，与 路由中的 path 相匹配
  // next('/login')
})

export default router
