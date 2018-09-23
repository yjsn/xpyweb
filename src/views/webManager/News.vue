<template>
  <div class="app-container">
    <div class="filter-container">
      <h3 style="display: inline-block">资讯管理</h3>
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
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.newsTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.newsDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.newsSort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="首页推荐">
        <template slot-scope="scope">
          <span>{{ scope.row.newsRecommend?'否':'是' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.newsStatus==2?'禁用':'启用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别">
        <template slot-scope="scope">
          <span>{{ scope.row.newsType==0?'佛门动态':scope.row.newsType==1?'政策法规':scope.row.newsType==2?'佛学入门':'法会信息' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="95">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <p style="margin: 10px 0" />
          <el-button type="warning" size="mini" icon="el-icon-setting" @click="openClose(scope.row)">{{ scope.row.newsStatus==2?'启用':'禁用' }}</el-button>
          <p style="margin: 10px 0" />
          <el-button type="danger" size="mini" icon="el-icon-remove" @click="deleteNews(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="options.pageNum" :page-sizes="[10,20,30, 50]" :page-size="options.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :fullscreen="true">
      <el-form ref="dataForm" :rules="rules" :model="dialogData" label-position="left" label-width="100px" style="width: 1000px; margin-left:50px;">
        <el-form-item v-if="dialogStatus==='update'" label="ID">
          <el-input v-model="dialogData.id" :disabled="true"/>
        </el-form-item>
        <el-form-item label="标题" prop="newsTitle">
          <el-input v-model="dialogData.newsTitle" />
        </el-form-item>
        <el-form-item label="描述" prop="newsDescription">
          <el-input v-model="dialogData.newsDescription" :rows="4" type="textarea" />
        </el-form-item>
        <el-form-item label="关键字" prop="newsKeywords">
          <el-input v-model="dialogData.newsKeywords" />
        </el-form-item>
        <el-form-item label="来源" prop="newsSource">
          <el-input v-model="dialogData.newsSource" />
        </el-form-item>
        <el-form-item label="内容" prop="newsContent">
          <div>
            <tinymce :height="300" v-model="dialogData.newsContent" :dialogid="dialogData.id"/>
          </div>
          <el-dialog
            :visible.sync="innerVisible"
            :fullscreen="true"
            width="30%"
            title="内容预览"
            append-to-body>
            <div v-html="dialogData.newsContent" />
          </el-dialog>
          <el-button style="margin-top: 10px" type="primary" icon="el-icon-search" @click="innerVisible = true">点击预览</el-button>
        </el-form-item>
        <el-form-item label="类别" prop="newsType">
          <el-select v-model="dialogData.newsType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in newsTypeList" :key="item.value" :label="item.name" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="newsImg">
          <el-upload
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload"
            :action="imgUrl"
            :data="{ type: 'img', folder: 'news', templeId: 0 }"
            class="avatar-uploader">
            <img v-if="dialogData.newsImg" :src="dialogShowImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="newsSort">
          <el-input-number :min="1" v-model="dialogData.newsSort" name="newsSort" controls-position="right" />
        </el-form-item>
        <el-form-item label="状态" prop="newsStatus">
          <el-radio-group v-model="dialogData.newsStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="推荐到首页" prop="newsRecommend">
          <el-radio-group v-model="dialogData.newsRecommend">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
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
import Tinymce from '@/components/Tinymce'
import { getNewsList, addNewsInfo, editNewsInfo, deleteNewsInfo, disableNewsInfo, ableNewsInfo } from '@/api/news'
import { imgUrl } from '@/api/images'
export default {
  name: 'News',
  components: { Tinymce },
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
      newsTypeList: [
        {
          value: 0,
          name: '佛门动态'
        },
        {
          value: 1,
          name: '政策法规'
        },
        {
          value: 2,
          name: '佛学入门'
        },
        {
          value: 3,
          name: '法会信息'
        }
      ],
      total: 1,
      dialogFormVisible: false,
      innerVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        newsImg: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        newsType: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        newsSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        newsDescription: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        newsTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        newsSource: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        newsKeywords: [
          { required: true, message: '请输入关键字', trigger: 'blur' }
        ],
        newsContent: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        newsStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        newsRecommend: [
          { required: true, message: '请选择是否推荐到首页', trigger: 'change' }
        ]
      },
      dialogData: {
        id: null,
        newsTitle: null,
        newsDescription: null,
        newsType: null,
        newsImg: null,
        newsSort: null,
        newsStatus: null,
        newsContent: null,
        newsRecommend: null,
        newsKeywords: null,
        newsSource: '原创'
      },
      dialogShowImg: null
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
      getNewsList(this.options).then(res => {
        this.listLoading = false
        this.list = res.data.list
        this.total = res.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetTemp() {
      this.dialogData = {
        id: null,
        newsTitle: null,
        newsDescription: null,
        newsType: null,
        newsImg: null,
        newsSort: null,
        newsStatus: null,
        newsRecommend: null,
        newsContent: null,
        newsKeywords: null,
        newsSource: '原创'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogData.newsContent = null
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addNewMenu() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addNewsInfo(this.dialogData).then((res) => {
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
      this.dialogData.newsContent = null
      this.dialogData = Object.assign({}, row) // copy obj
      this.dialogData.newsContent = row.newsContent
      this.dialogShowImg = row.newsImg + '/200X200'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editMenu() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dialogData)
          editNewsInfo(tempData).then((res) => {
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
      this.dialogData.newsImg = res.data
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
      if (row.newsStatus === 1) {
        disableNewsInfo({ id: row.id }).then(res => {
          for (const v of this.list) {
            if (v.id === row.id) {
              v.newsStatus = 2
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
        ableNewsInfo({ id: row.id }).then(res => {
          for (const v of this.list) {
            if (v.id === row.id) {
              v.newsStatus = 1
              break
            }
          }
          this.$notify({
            title: '成功',
            message: '启用成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    deleteNews(row) {
      this.$confirm('确认删除？')
        .then(_ => {
          deleteNewsInfo({ id: row.id, status: 99 }).then(res => {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
