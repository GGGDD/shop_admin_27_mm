<template>
  <!--
    el-form 表单组件
      model 表单数据对象
        比如：一个登录表单，这个对象中应该有 userName 和 password 两个数据
      :rules 表单验证规则
      label-width 表单域标签的宽度
      label-position="top" 用于设置表单域标签的位置，top表示顶部
      ref

    el-form-item 表单中的每一行
      label 标签文本，其实就是每一行表单的说明文字（比如：用户名、密码）
      prop 表单域 model 字段，在使用 validate（ 表单验证 ）、resetFields（ 重置表单 ） 方法的情况下，该属性是必填的
   -->
  <el-form label-position="top" :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username"></el-input>
      <!-- <p ref="p1">这是一个P</p> -->
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 导入 axios
import axios from 'axios'

export default {
  data () {
    return {
      // 登录表单数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 用户名和密码的校验规则
      rules: {
        username: [
          // trigger  表示触发表单验证的时机
          // required 是否为必填项，true表示必填项
          // message  表单校验失败时，展示的提示信息
          // min 和 max 配合用来限制表单内容的长度
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '用户名长度为3到12个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为6到12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录事件：
    submitForm (formName) {
      // validate 方法用来实现表单校验
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false
        }

        // 校验成功
        // 发送请求到登录接口，完成登录
        axios
          .post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            // console.log('登录结果：', res)
            if (res.data.meta.status === 200) {
              // 登录成功，跳转到后台首页
              // 通过编程式导航实现路由跳转
              // push 方法的参数为：要跳转到的页面路径，与 路由规则 中的path匹配
              this.$router.push('/home')
              this.$message({
                message: res.data.meta.msg,
                type: 'success',
                duration: 800
              })
            } else {
              // 登录失败
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
      })
    },
    // 表单重置：
    resetForm (formName) {
      // resetFields 方法用来重置表单
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
</style>
