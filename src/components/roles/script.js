export default {
  data () {
    return {
      // 当前分配角色的id
      curRoleId: -1,
      tableData: [],
      // 显示弹框
      rolesVisible: false,
      // 树的数据
      rolesData: [],
      //
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    // 获取 角色列表
    this.getRoles()
    // 显示 所有权限数据
    this.renderRoles()
  },
  methods: {
    // 分配权限弹框的 点击按钮
    async allotRoles () {
      // console.log('asd')
      // 选中 全选的id
      const CheckedKeys = this.$refs.tree.getCheckedKeys()
      // 选中 半选的id值
      const HalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // es6 语法 合并数组
      const allKeys = [...CheckedKeys, ...HalfCheckedKeys]

      // 请求接口 修改数据   角色授权
      const res = await this.$http.post(`/roles/${this.curRoleId}/rights`, {
        rids: allKeys.join(',')
      })

      // 请求接口 完毕 , 关闭对话框 , 刷新 角色列表  , 弹出提示
      this.rolesVisible = false
      this.getRoles()
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      //
    },
    // 点击弹出分配权限弹框
    showDialog (current) {
      this.rolesVisible = true
      // 存储当前正在编辑的角色id , 一旦弹出框 , 没有按下 确定按钮修改之前  , 就拿到 id值
      this.curRoleId = current.id
      // $nextTick() 中的回调函数 来获取到更新后的组件（DOM）
      this.$nextTick(() => {
        const checkedKeys = []
        current.children.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              checkedKeys.push(level3.id)
            })
          })
        })
        // 通过 keys 设置目前勾选的节点 , 传入的是id
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },
    // 所有权限 , 分配权限 ,
    async renderRoles () {
      const res = await this.$http.get(`rights/tree`)
      console.log(res)
      this.rolesData = res.data.data
    },
    // 点击删除 ,小tab标签
    async closeRolseTag (rightId, roleId) {
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      console.log(res)
      this.getRoles()
    },
    // 渲染列表
    async getRoles () {
      const res = await this.$http.get('/roles')
      console.log(res)
      this.tableData = res.data.data
    },
    // 列表数字
    getIndex (index) {
      return index
    }
  }
}
