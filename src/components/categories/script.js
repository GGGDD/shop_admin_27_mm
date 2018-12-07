// 引入 element-tree-grid , 把全局组件 变成 局部组件
import ElTreeGrid from 'element-tree-grid'
export default {
  components: {
    // 局部组件 引入
    [ElTreeGrid.name]: ElTreeGrid
  },
  data () {
    return {
      // 配置选项
      propObj: {
        value: 'cat_id',
        label: 'cat_name'
      },
      // 级联选择器 数据源
      addCateList: [],
      // 添加分类弹框 数据
      categoryData: {
        username: '',
        // 联级选择器 选中的值 , 是个数组 储存选中的值 , 一项 或者 两项
        catIds: []
      },
      //  添加分类  弹框的显示和隐藏
      categoryVisible: false,
      CateData: [],
      pagenum: 0,
      total: 0,
      pagesize: 0,
      isloading: false
    }
  },
  created () {
    // 请求 总页面数据
    this.runderCategories()
    // 渲染 练级选择器中的数据
    this.getCateList()
  },
  methods: {
    // 弹框的 确定按钮
    async confirmDialog () {
      console.log('4545')
      const {username, catIds} = this.categoryData
      const res = await this.$http.post('categories', {
        // 分类父 Id 不能为空 , 当前元素 父亲的id , [1,2] 添加的是三级菜单 , 要拿到二级菜单的数据 就是 arr[arr.length] 拿到这个2
        cat_pid: catIds[catIds.length - 1],
        // 分类名称 不能为空
        cat_name: username,
        // 分类层级 不能为空
        // cat_level一级0 , 二级1 , 三级2 , 是当前 要添加的分类层级 [1,2]  现在已经选中了 连个级别 , length是2 , 要添加三级分类. 三级分类的cat_level是2
        // 所以是 catIds.length , 添加的是 当前分类的层级
        cat_level: catIds.length
      })
      console.log(res)
      // 请求完成 关闭对话框 , 刷新数据列表 ,弹出提示框
      this.categoryVisible = false
      this.runderCategories()
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    },
    // 请求 联级选择器中的数据
    async getCateList () {
      // 请求 接口
      const res = await this.$http.get('categories', {
        // 切记 , gei请求使用 params , 必须切记
        params: {
          // 2表示层级 , 只请求两层 层级
          // 练级选择器 , 只显示两层就好了
          type: 2
        }
      })
      // 把请求到的 练级选择器数据 , 赋值给 练级练级选择器列表addCateList
      this.addCateList = res.data.data
      console.log('练级选择器', res)
    },
    // 点击添加分类列表 显示 对话框
    showAddCate () {
      this.categoryVisible = true
    },
    // 请求数据
    async runderCategories (pagenum = 1) {
      this.isloading = true
      const res = await this.$http.get('categories', {
        params: {
          type: 3,
          // 分页
          pagenum,
          pagesize: 6
        }
      })
      console.log(res)
      const {result, total, pagesize, pagenum: currpage} = res.data.data
      this.CateData = result
      this.total = total
      this.pagenum = currpage
      this.isloading = false
      this.pagesize = pagesize
    },
    // 点击分页 切换数据
    currChange (page) {
      this.runderCategories(page)
    }
  }
}
