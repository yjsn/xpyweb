<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="options.bean.templeName" placeholder="寺庙名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus">新增</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="商户账号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.accountNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属寺庙">
        <template slot-scope="scope">
          <span>{{ scope.row.templeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.accountName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status==2?'禁用':'启用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="182">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="warning" size="mini" icon="el-icon-setting" @click="openClose(scope.row)">{{ scope.row.status==2?'启用':'禁用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="options.pageNum" :page-sizes="[10,20,30, 50]" :page-size="options.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getMerchantList } from '@/api/merchant'
export default {
  name: 'MerchantList',
  data() {
    return {
      options: {
        bean: {
          templeName: ''
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
      getMerchantList(this.options).then(res => {
        this.listLoading = false
        this.list = res.data.list
        this.total = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    openClose(row) {
      // editMenu({ state: Number(!row.state), id: row.id }).then(res => {
      //   for (const v of this.list) {
      //     if (v.id === row.id) {
      //       v.state = Number(!row.state)
      //       break
      //     }
      //   }
      //   this.$notify({
      //     title: '成功',
      //     message: '设置成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      // })
    }
  }
}
</script>

<style scoped>

</style>
