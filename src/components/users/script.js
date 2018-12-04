import axios from 'axios'
export default {
  created () {
    this.runder(1)
  },
  data () {
    return {
      userData: [],
      // 总页数
      total: 1,
      // 展示第几页数据
      pagenum: 1,
      // 每页显示几条数据
      pageSize: 3,
      // input 关联的数据
      info: ''
    }
  },
  methods: {

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
        // get方式请求头
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }

      // const res = await axios.get('http://localhost:8888/api/private/v1/users', config)

      const res = await this.$http.get('users', config)
      // es6解构
      const {meta, data} = res.data
      const {users, total, pagenum: cuePage} = data
      if (meta.status === 200) {
        // 成功了 , 就 拿到值 , 赋值 给 列表的数据 userData

        // 渲染 总条数
        this.total = total
        // 渲染 数据
        this.userData = users
        // 重新渲染页码
        this.pagenum = cuePage
        console.log(res)
      } else {
        // 没有登陆成功 , 就清除 token , 然后 , 跳转到 登陆页面进行 跳转
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
}
