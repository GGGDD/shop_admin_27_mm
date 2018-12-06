// import axios from 'axios'
// 邮箱正则
const EMAIL_REG = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
// 手机号码正则
const MOBILE_GER = /^1(3|4|5|7|8)\d{9}$/
export default {
  created () {
    // 渲染页面
    this.runder(3)
    // 获取 角色列表数据
    this.getRolesList()
  },
  data () {
    return {
      // 下拉列表数据
      userRoleList: [],
      value: '',
      // 用户 分配角色数据
      rolData: {
        // 用户角色名称
        username: '',
        // 用户角色id
        rid: '',
        // 用户id
        userid: -1
      },
      // 用户分配角色弹框 显示隐藏
      roleVisible: false,
      userData: [],
      // 总页数
      total: 1,
      // 展示第几页数据
      pagenum: 1,
      // 每页显示几条数据
      pageSize: 3,
      // input 关联的数据
      info: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      outerVisible: false,
      useForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 修改弹窗 表单
      updateForm: {
        id: -1,
        username: 'sadasd',
        email: '',
        mobile: ''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: EMAIL_REG, message: '邮箱不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: MOBILE_GER, message: '手机号码格式不正确', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    // 点击 弹框的 确定按钮 , 分配角色给用户
    async assigmRole () {
      const {userid, rid} = this.rolData
      const res = await this.$http.put(`/users/${userid}/role`, {
        rid
      })
      // console.log(res)
      // 关闭对话框 , 刷新列表数据
      this.roleVisible = false
      this.runder(1)
      this.$message({
        type: 'message',
        message: res.data.meta.msg
      })
    },
    // 一进入页面 , 获取角色列表数据 , 钩子函数调用
    async getRolesList () {
      const res = await this.$http.get('/roles')
      console.log('asdasds', res)
      this.userRoleList = res.data.data
    },
    // 点击 分配角色 弹出 框
    async roleShow (curren) {
      this.roleVisible = true

      // 根据 ID 查询用户信息 , 请求 接口 拿到角色id
      const res = await this.$http.get(`users/${curren.id}`)

      let { rid } = res.data.data
      rid = rid === -1 ? '' : rid
      // 显示 当前用户名称 和角色id
      this.rolData.username = curren.username
      // 没有 用户角色id  上面请求接口 , 拿id
      this.rolData.rid = rid
      // 暂存 用户id
      this.rolData.userid = curren.id
    },
    // 点击确定 , 编辑用户
    async editForm () {
      const {id, email, mobile} = this.updateForm
      const res = await this.$http.put(`users/${id}`, {
        email,
        mobile
      })
      console.log(res)
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'message',
          message: meta.msg
        })
        this.outerVisible = false
        this.runder(1)
      } else {
        this.$message({
          type: 'error',
          message: meta.msg
        })
      }
    },
    // 修改 弹框
    updateItem (form) {
      this.outerVisible = true
      // 可以使用 传递值的方法 , 但是可以使用对象 拷贝
      // this.updateForm.username = form.username
      for (let key in this.updateForm) {
        this.updateForm[key] = form[key]
      }
      console.log(form)
    },
    // 关闭 对话框
    closeDialog () {
      this.$refs.useForm.resetFields()
      this.runder(1)
    },
    // 添加用户确定
    async addUseItem () {
      try {
        await this.$refs.useForm.validate()

        const res = await this.$http.post('/users', this.useForm)
        console.log(res)
        const {meta} = res.data
        if (meta.status === 201) {
          this.runder(1)
          this.$message({
            type: 'success',
            message: meta.msg
          })
        }
        this.dialogFormVisible = false
      } catch (e) {
        console.log(e)
      }
    },
    // 展示对话框
    addItem () {
      // this.dialogTableVisible = true
      this.dialogFormVisible = true
    },

    // 删除按钮
    delItem (scope) {
      this.$confirm('确当删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 成功
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        const res = await this.$http.delete(`users/${scope.id}`)
        if (res.data.meta.status === 200) {
          // 渲染成功 , 添加 提示框 , 是否删除
          this.runder()
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: 'error'
          })
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    // 点击 switch开关
    async switchChange (scope) {
      const res = await this.$http.put(`users/${scope.id}/state/${scope.mg_state}`)
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: meta.msg,
          type: 'error'
        })
      }
    },
    // 搜索功能
    searchItem () {
      this.runder(1, this.info)
      console.log(this.info)
    },
    // 点击 页码 跳转当前页
    currChange (page) {
      console.log(page)
      this.runder(page)
    },
    // 渲染页面
    async runder (pagenum = 1, query = '') {
      const config = {
        params: {
          // 每页总条数
          pagesize: 3,
          // 当前 页码
          pagenum,
          // 查询
          query
        }
      }

      const res = await this.$http.get('users', config)
      // es6解构
      const {meta, data} = res.data
      const {users: useee, total, pagenum: cuePage} = data
      if (meta.status === 200) {
        // 成功了 , 就 拿到值 , 赋值 给 列表的数据 userData
        // 渲染 总条数
        this.total = total
        // 渲染 数据
        this.userData = useee
        // 重新渲染页码
        this.pagenum = cuePage
      } else {
        // 没有登陆成功 , 就清除 token , 然后 , 跳转到 登陆页面进行 跳转
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
}
