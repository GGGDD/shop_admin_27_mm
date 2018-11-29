// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入自己封装的路由模块
import router from './router'

// 导入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入CSS样式
import '@/assets/css/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 作用：告诉 ESlint 不要校验下一行代码的 no-new 规则，注释不能去掉
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 3 将路由实例与Vue实例关联到一起
  router
})
