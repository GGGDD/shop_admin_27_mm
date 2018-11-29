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
      <el-input v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单数据
      loginForm: {
        username: '',
        password: ''
      },
      // 用户名和密码的校验规则
      rules: {
        username: [
          // trigger  表示触发表单验证的时机
          // required 是否为必填项，true表示必填项
          // message  表单校验失败时，展示的提示信息
          // min 和 max 配合用来限制表单内容的长度
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 12, message: '用户名长度为6到12个字符', trigger: 'blur' }
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
      // $refs 在 Vue 中用来直接获取组件或DOM对象
      // $refs 表示页面中所有 ref 的集合，是一个对象，通过 $refs 对象中的属性，可以直接
      // 拿到页面中的组件或DOM对象
      // console.log(this.$refs, this.$refs.p1.innerText)

      // this.$refs[formName].validate((valid) => {
      // this.$refs.ruleForm 就是 el-form 表单组件
      // validate 方法用来实现表单校验
      this.$refs.ruleForm.validate((valid) => {
        // if (valid) {
        //   alert('表单校验成功：submit!')
        // } else {
        //   console.log('表单校验失败：error submit!!')
        //   return false
        // }

        if (!valid) {
          return false
        }

        // 校验成功
        // 发送请求到登录接口，完成登录
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
