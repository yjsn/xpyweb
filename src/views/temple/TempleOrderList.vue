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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.meritsStatus == '进行中'" type="warning" size="mini" icon="el-icon-setting" @click="handleEdit(scope.row)">订单回执</el-button>
          <el-button type="text" size="mini" icon="el-icon-message" @click="meritsDetail(scope.row)">查看订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="options.pageNum" :page-sizes="[10,20,30, 50]" :page-size="options.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="功德订单回执">
      <el-form ref="dataForm" :rules="rules" :model="dialogData" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="订单编号">
          <el-input v-model="dialogData.meritsNumber" :disabled="true"/>
        </el-form-item>
        <el-form-item label="祈愿人姓名" prop="imgLink">
          <el-input v-model="dialogData.customerName" :disabled="true"/>
        </el-form-item>
        <el-form-item label="功德项目" prop="imgLink">
          <el-input v-model="dialogData.meritsName" :disabled="true"/>
        </el-form-item>
        <el-form-item label="预约时间" prop="imgDescription">
          <el-input v-model="dialogData.applyTime" :disabled="true"/>
        </el-form-item>
        <el-form-item label="图片1" prop="meritsImg1">
          <el-upload
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload"
            :action="imgUrl"
            :data="{ type: 'img', folder: 'merits', templeId: dialogData.id }"
            class="avatar-uploader">
            <img v-if="dialogData.meritsImg1" :src="dialogShowImg1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="图片2" prop="meritsImg2">
          <el-upload
            :show-file-list="false"
            :on-success="handleImgSuccess1"
            :before-upload="beforeImgUpload"
            :action="imgUrl"
            :data="{ type: 'img', folder: 'merits', templeId: dialogData.id }"
            class="avatar-uploader">
            <img v-if="dialogData.meritsImg2" :src="dialogShowImg2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetMerits">取消</el-button>
        <el-button type="primary" @click="editMerits">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList, orderCompletion, orderDetail } from '@/api/order'
import { imgUrl } from '@/api/images'
export default {
  name: 'TempleOrderList',
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
      dialogFormVisible: false,
      rules: {
        meritsImg1: [
          { required: true, message: '请上传图片1', trigger: 'change' }
        ],
        meritsImg2: [
          { required: true, message: '请上传图片2', trigger: 'change' }
        ],
        templeName: [
          { required: true, message: '请输入寺庙名称', trigger: 'blur' }
        ],
        templeDescription: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        templeIntroduce: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ]
      },
      dialogData: {
        meritsImg1: null,
        meritsImg2: null,
        meritsId: null,
        meritsNumber: null,
        customerName: null,
        meritsName: null,
        applyTime: null
      },
      meritsParams: {
        id: null
      },
      imgUrl: imgUrl,
      dialogShowImg1: null,
      dialogShowImg2: null,
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
    handleImgSuccess(res, file) {
      this.dialogShowImg1 = URL.createObjectURL(file.raw)
      this.dialogData.meritsImg1 = res.data
    },
    handleImgSuccess1(res, file) {
      this.dialogShowImg2 = URL.createObjectURL(file.raw)
      this.dialogData.meritsImg2 = res.data
    },
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/pjpeg' || 'image/gif' || 'image/bmp' || 'image/x-png' || 'image/tiff' || 'image/png' || 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt10M
    },
    resetMerits() {
      this.dialogData = {
        id: null,
        meritsNumber: null,
        customerName: null,
        meritsName: null,
        applyTime: null
      }
      this.dialogFormVisible = false
    },
    handleEdit(row) {
      // this.dialogData = Object.assign({}, row) // copy obj
      this.meritsParams.id = row.id
      orderDetail(this.meritsParams).then(res => {
        if (res.data) {
          this.dialogData.meritsImg1 = res.data.meritsImg1
          this.dialogData.meritsImg2 = res.data.meritsImg2
          this.dialogData.meritsId = res.data.meritsId
          this.dialogData.meritsNumber = res.data.merits.meritsNumber
          this.dialogData.meritsName = res.data.merits.meritsName
          this.dialogData.customerName = res.data.merits.customerName
          this.applyTime = res.data.merits.applyTime
          this.dialogShowImg1 = this.dialogData.meritsImg1 + '/200X200'
          this.dialogShowImg2 = this.dialogData.meritsImg2 + '/200X200'
        } else {
          this.dialogData.meritsId = row.id
          this.dialogData.meritsNumber = row.meritsNumber
          this.dialogData.meritsName = row.meritsName
          this.dialogData.customerName = row.customerName
          this.dialogData.applyTime = row.applyTime
        }
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    editMerits() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const meritsDetailData = Object.assign({}, this.dialogData)
          console.log(meritsDetailData)
          orderCompletion(meritsDetailData).then((res) => {
            for (const v of this.list) {
              if (v.id === this.dialogData.meritsId) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, res.data.merits)
                break
              }
            }
            this.dialogData = res.data
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
