<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="options.bean.meritsNumber" placeholder="功德号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="options.bean.customerName" placeholder="祈愿人姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="功德号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.meritsNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="祈愿人姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="功德项目">
        <template slot-scope="scope">
          <span>{{ scope.row.meritsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="功德" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.meritsAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.applyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.meritsStatus }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="options.pageNum" :page-sizes="[10,20,30, 50]" :page-size="options.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order'
export default {
  name: 'OrderList',
  data() {
    return {
      options: {
        bean: {
          meritsNumber: '',
          customerName: ''
        },
        pageNum: 1,
        pageSize: 10
      },
      listLoading: false,
      list: [],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.options.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.options.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.options.pageNum = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      getOrderList(this.options).then(res => {
        this.listLoading = false
        res.data.list.forEach(item => {
          switch (item.meritsStatus) {
            case 0:
              item.meritsStatus = '申请'
              break
            case 1:
              item.meritsStatus = '未支付'
              break
            case 2:
              item.meritsStatus = '进行中'
              break
            case 3:
              item.meritsStatus = '完成'
              break
            case 4:
              item.meritsStatus = '未完成'
              break
            case 5:
              item.meritsStatus = '退款'
              break
            case 9:
              item.meritsStatus = '异常'
              break
          }
        })
        this.list = res.data.list
        this.total = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
