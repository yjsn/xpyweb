<template>
  <div class="app-container">
    <div class="filter-container">
      <h3 style="display: inline-block">banner管理</h3>
      <el-button style="margin-left: 10px" class="filter-item" type="primary" icon="el-icon-circle-plus" @click="handleCreate">新增</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="id" align="center" width="75">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center" width="170">
        <template slot-scope="scope">
          <el-popover
            placement="right-start"
            width="825"
            trigger="hover"
            @show="showImg(scope.row.imgUrl)">
            <div class="popover-img">
              <img :src="popoverImg+'/base'" alt="" class="listImg">
            </div>
            <el-button slot="reference" type="text" class="imgButton">
              <div class="imgBox">
                <img slot="reference" :src="scope.row.imgUrl+'/100X100'" alt="" class="listImg">
              </div>
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.imgDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接">
        <template slot-scope="scope">
          <span>{{ scope.row.imgLink }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="75" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status==2?'禁用':'启用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="95">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <p style="margin: 10px 0" />
          <el-button type="warning" size="mini" icon="el-icon-setting" @click="openClose(scope.row)">{{ scope.row.status==2?'启用':'禁用' }}</el-button>
          <p style="margin: 10px 0" />
          <el-button type="danger" size="mini" icon="el-icon-remove" @click="deleteBanner(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="options.pageNum" :page-sizes="[10,20,30, 50]" :page-size="options.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dialogData" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="dialogStatus==='update'" label="ID">
          <el-input v-model="dialogData.id" :disabled="true"/>
        </el-form-item>
        <el-form-item label="图片" prop="imgUrl">
          <el-upload
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload"
            :action="imgUrl"
            :data="{ type: 'img', folder: 'indexBanner', templeId: 0 }"
            class="avatar-uploader">
            <img v-if="dialogData.imgUrl" :src="dialogShowImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" prop="imgDescription">
          <el-input v-model="dialogData.imgDescription" :rows="4" type="textarea" />
        </el-form-item>
        <el-form-item label="链接" prop="imgLink">
          <el-input v-model="dialogData.imgLink" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number :min="1" v-model="dialogData.sort" name="sort" controls-position="right" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dialogData.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addNewBanner">确定</el-button>
        <el-button v-else type="primary" @click="editBanner">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBannerList, addBannerInfo, editBannerInfo, deleteBannerInfo } from '@/api/banner'
import { imgUrl } from '@/api/images'
export default {
  name: 'Banner',
  data() {
    return {
      imgUrl: imgUrl,
      options: {
        bean: {},
        pageNum: 1,
        pageSize: 10
      },
      listLoading: false,
      list: [],
      total: 1,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        imgLink: [
          { required: true, message: '请输入图片链接', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        imgDescription: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      dialogData: {
        imgUrl: null,
        id: null,
        imgLink: null,
        status: null,
        imgDescription: null,
        sort: 1
      },
      dialogShowImg: null,
      popoverImg: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
      getBannerList(this.options).then(res => {
        this.listLoading = false
        this.list = res.data.list
        this.total = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetTemp() {
      this.dialogData = {
        imgLink: null,
        id: null,
        imgDescription: null,
        status: null,
        imgUrl: null,
        sort: 1
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
    addNewBanner() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addBannerInfo(this.dialogData).then((res) => {
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
    handleEdit(row) {
      this.dialogData = Object.assign({}, row) // copy obj
      this.dialogShowImg = row.imgUrl + '/200X200'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editBanner() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dialogData)
          editBannerInfo(tempData).then((res) => {
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
    handleImgSuccess(res, file) {
      this.dialogShowImg = URL.createObjectURL(file.raw)
      this.dialogData.imgUrl = res.data
    },
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/pjpeg' || 'image/gif' || 'image/bmp' || 'image/x-png' || 'image/tiff' || 'image/png' || 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    openClose(row) {
      const myStatus = (row.status === 1 ? 2 : 1)
      editBannerInfo({ status: myStatus, id: row.id }).then(res => {
        for (const v of this.list) {
          if (v.id === row.id) {
            v.status = myStatus
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
    deleteBanner(row) {
      this.$confirm('确认删除？')
        .then(_ => {
          deleteBannerInfo({ id: row.id, status: 99 }).then(res => {
            this.list = this.list.filter(item => {
              return item.id !== row.id
            })
            this.$message({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        })
        .catch(_ => {})
    },
    showImg(img) {
      this.popoverImg = img
      console.log(111)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .popover-img {
    width: 800px;
    .listImg {
      width: 100%;
      height: 100%;
    }
  }
  .imgBox {
    width: 100px;
    height: 100px;
    .listImg {
      width: 100%;
      height: 100%;
    }
  }
</style>
