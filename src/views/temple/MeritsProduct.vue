<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="options.bean.meritsName" placeholder="产品名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="options.bean.templeName" placeholder="寺庙名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="寺庙名称">
        <template slot-scope="scope">
          <span>{{ scope.row.templeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型">
        <template slot-scope="scope">
          <span>{{ scope.row.meritsType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.meritsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品价格">
        <template slot-scope="scope">
          <span>{{ scope.row.salePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算价格">
        <template slot-scope="scope">
          <span>{{ scope.row.settlementPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.meritsStatus==0?'申请':scope.row.meritsStatus==1?'启用':scope.row.meritsStatus==2?'禁用':scope.row.meritsStatus==3?'申请未通过':'异常' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="305">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1 || scope.row.status==2" type="warning" size="mini" icon="el-icon-setting" @click="openClose(scope.row)">{{ scope.row.status==2?'启用':'禁用' }}</el-button>
          <template v-if="scope.row.status==0">
            <el-button type="success" size="mini" icon="el-icon-setting" @click="toBeCross(scope.row)">通过</el-button>
            <el-button type="warning" size="mini" icon="el-icon-setting" @click="toBeNoCross(scope.row)">不通过</el-button>
          </template>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="goToEdit(scope.row.id)">首页编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="options.pageNum" :page-sizes="[10,20,30, 50]" :page-size="options.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
  import { getTempleList, ableTemple, disableTemple, checkFailTemple } from '@/api/temple'
  export default {
    name: 'TempleList',
    data() {
      return {
        options: {
          bean: {
            templeName: '',
            templeNumber: ''
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
        getTempleList(this.options).then(res => {
          this.list = res.data.list
          this.total = res.data.total
        })
      },
      toBeCross(row) {
        ableTemple({ id: row.id }).then(res => {
          for (const v of this.list) {
            if (v.id === row.id) {
              v.status = 1
              break
            }
          }
          this.$notify({
            title: '成功',
            message: '设置成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      openClose(row) {
        if (row.status === 2) {
          ableTemple({ id: row.id }).then(res => {
            for (const v of this.list) {
              if (v.id === row.id) {
                v.status = 1
                break
              }
            }
            this.$notify({
              title: '成功',
              message: '设置成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          disableTemple({ id: row.id }).then(res => {
            for (const v of this.list) {
              if (v.id === row.id) {
                v.status = 2
                break
              }
            }
            this.$notify({
              title: '成功',
              message: '设置成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      },
      toBeNoCross(row) {
        checkFailTemple({ templeId: row.id }).then(res => {
          for (const v of this.list) {
            if (v.id === row.id) {
              v.status = 1
              break
            }
          }
          this.$notify({
            title: '成功',
            message: '设置成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      goToEdit(id) {
        this.$router.push({ name: 'TempleHome', query: { id: id }})
      }
    }
  }
</script>

<style scoped>

</style>
