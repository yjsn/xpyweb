<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="options.bean.meritsName" placeholder="产品名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="options.bean.templeName" placeholder="寺庙名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus" @click="handleCreate">新增</el-button>
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
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="goToEdit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="options.pageNum" :page-sizes="[10,20,30, 50]" :page-size="options.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dialogData" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="dialogStatus==='update'" label="ID">
          <el-input v-model="dialogData.id" :disabled="true"/>
        </el-form-item>
        <el-form-item label="所属寺庙" prop="templeId">
          <el-select v-model="dialogData.parentId" class="filter-item" placeholder="请选择">
            <el-option v-for="item in menuList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogData.name" :disabled="dialogStatus==='update'" name="name"/>
        </el-form-item>
        <el-form-item label="icon" prop="icon">
          <el-input v-model="dialogData.icon" name="icon"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number :min="1" v-model="dialogData.sort" name="sort" controls-position="right" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="dialogData.state">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addNewMenu">确定</el-button>
        <el-button v-else type="primary" @click="editMenu">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getMeritsList, addMeritsProduct, editMeritsProduct, getTempleList } from '@/api/meritsProduct'
  export default {
    name: 'TempleList',
    data() {
      return {
        options: {
          bean: {
            templeName: '',
            meritsName: ''
          },
          pageNum: 1,
          pageSize: 10
        },
        listLoading: false,
        list: [],
        total: 0,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新增'
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请输入icon', trigger: 'blur' }
          ],
          parentId: [
            { required: true, message: '请选择父级菜单', trigger: 'change' }
          ],
          sort: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ]
        },
        dialogData: {
          icon: null,
          id: null,
          name: null,
          state: null,
          parentId: null,
          sort: 1
        }
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
        getMeritsList(this.options).then(res => {
          this.list = res.data.list
          this.total = res.data.total
        })
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
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

      }
    }
  }
</script>

<style scoped>

</style>
