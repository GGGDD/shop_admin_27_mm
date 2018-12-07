export default {
  data () {
    return {
      tableData: [],
      pagesize: 6,
      total: 0,
      pagenum: 1
    }
  },
  created () {
    this.getGoodsList()
  },

  methods: {

    async getGoodsList (pagenum = 1) {
      const res = await this.$http.get('goods', {
        params: {
          query: '',
          pagenum,
          pagesize: this.pagesize
        }
      })

      const {total, pagenum: currentPage, goods} = res.data.data
      this.tableData = goods
      this.total = total
      this.pagenum = currentPage
    },
    currChange (page) {
      this.getGoodsList(page)
    }
  }
}
