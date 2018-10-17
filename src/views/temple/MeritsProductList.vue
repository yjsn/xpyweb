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
          <span>{{ scope.row.meritsType ==1?'上香':scope.row.meritsType ==2?'佛灯':scope.row.meritsType ==3?'许愿':cope.row.meritsType ==4?'忏悔':cope.row.meritsType ==5?'修行':cope.row.meritsType ==6?'抄经':cope.row.meritsType ==7?'捐助':'' }}</span>
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
          <span>{{ scope.row.meritsStatus==1?'启用':'禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="305">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" icon="el-icon-setting" @click="openClose(scope.row)">{{ scope.row.meritsStatus===2?'启用':'禁用' }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
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
          <el-select v-model="dialogData.templeId" class="filter-item" placeholder="请选择" @change="changeTemple">
            <el-option v-for="item in templeList" :key="item.id" :label="item.templeName" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" prop="meritsType">
          <el-select v-model="dialogData.meritsType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in meritsTypeList" :key="item.id" :label="item.value" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="meritsName">
          <el-input v-model="dialogData.meritsName" name="meritsName"/>
        </el-form-item>
        <el-form-item label="产品价格" prop="salePrice">
          <el-input-number :min="1" v-model="dialogData.salePrice" name="salePrice" controls-position="right" />
        </el-form-item>
        <el-form-item label="结算价格" prop="settlementPrice">
          <el-input-number :min="1" v-model="dialogData.settlementPrice" name="settlementPrice" controls-position="right" />
        </el-form-item>
        <el-form-item label="状态" prop="meritsStatus">
          <el-radio-group v-model="dialogData.meritsStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addMeritsProduct">确定</el-button>
        <el-button v-else type="primary" @click="editMeritsProduct">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMeritsList, addMeritsProduct, editMeritsProduct, getTempleList, disable, able } from '@/api/meritsProduct'
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
        templeId: [
          { required: true, message: '请选择寺庙', trigger: 'change' }
        ],
        templeName: [
          { required: true, message: '请选择寺庙', trigger: 'blur' }
        ],
        meritsType: [
          { required: true, message: '请选择功德类型', trigger: 'change' }
        ],
        meritsName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        salePrice: [
          { required: true, message: '请输入销售价格', trigger: 'change' }
        ],
        settlementPrice: [
          { required: true, message: '请输入结算价格', trigger: 'change' }
        ],
        meritsStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      dialogData: {
        id: null,
        templeId: null,
        templeName: null,
        meritsType: null,
        meritsName: null,
        salePrice: null,
        settlementPrice: null,
        meritsStatus: null
      },
      meritsTypeList: [
        { id: 1,
          value: '上香'
        },
        { id: 2,
          value: '佛灯'
        },
        { id: 3,
          value: '许愿'
        },
        { id: 4,
          value: '忏悔'
        },
        { id: 5,
          value: '修行'
        },
        { id: 6,
          value: '抄经'
        },
        { id: 7,
          value: '捐助'
        }],
      templeList: []
    }
  },
  created() {
    this.getList()
    getTempleList({}).then(res => {
      this.templeList = res.data
    })
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
    changeTemple(val) {
      this.dialogData.templeName = val.templeName
      this.dialogData.templeId = val.id
    },
    getList() {
      getMeritsList(this.options).then(res => {
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    resetTemp() {
      this.dialogData = {
        id: null,
        templeId: null,
        templeName: null,
        meritsType: null,
        meritsName: null,
        salePrice: null,
        settlementPrice: null,
        meritsStatus: null
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleEdit(row) {
      this.dialogData = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addMeritsProduct() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addMeritsProduct(this.dialogData).then((res) => {
            this.list.unshift(res.data)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    editMeritsProduct() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dialogData)
          editMeritsProduct(tempData).then((res) => {
            for (const v of this.list) {
              if (v.id === this.dialogData.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, res.data)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    openClose(row) {
      if (row.meritsStatus === 1) {
        disable({ id: row.id }).then(res => {
          for (const v of this.list) {
            if (v.id === row.id) {
              v.meritsStatus = 2
              break
            }
          }
          this.$notify({
            title: '成功',
            message: '禁用成功',
            type: 'success',
            duration: 2000
          })
        })
      } else {
        able({ id: row.id }).then(res => {
          for (const v of this.list) {
            if (v.id === row.id) {
              v.meritsStatus = 1
              this.$notify({
                title: '成功',
                message: '启用成功',
                type: 'success',
                duration: 2000
              })
              break
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
