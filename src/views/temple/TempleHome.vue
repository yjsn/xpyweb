<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <div class="card">
        <div class="card-title">
          <h3>寺庙简介</h3>
          <el-button class="filter-item" type="primary" @click="handleEdit">编辑</el-button>
        </div>
        <div style="padding: 10px">
          <img :src="introduction.templeCoverImg" alt="" class="fahuiImg">
          <h4>{{ introduction.templeName }}</h4>
          <p>{{ introduction.templeIntroduce }}</p>
        </div>
      </div>
      <div class="card" style="padding-right: 9px;">
        <div class="card-title">
          <h3>僧人介绍</h3>
          <el-button class="filter-item" type="primary" @click="goToMonk">管理</el-button>
        </div>
        <el-row :gutter="8">
          <el-col v-for="item in monks" :key="item.id" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 8}" style="margin-bottom:30px;">
            <el-card class="box-card-component" style="margin-left:8px;">
              <div slot="header" class="box-card-header">
                <img :src="item.templeMonkCoverImg+'/base'">
              </div>
              <h4>{{ item.templeMonkName }}</h4>
              <p>{{ item.templeMonkDesciption }}</p>
            </el-card>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 8}" style="margin-bottom:30px;">
            <el-card class="box-card-component" style="margin-left:8px;text-align: center;line-height: 400px">
              <el-button @click="goToMonk">查看更多</el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="card" style="padding-right: 9px;">
        <div class="card-title">
          <h3>法会信息及寺庙活动</h3>
          <el-button class="filter-item" type="primary" @click="goToActivity">管理</el-button>
        </div>
        <el-row :gutter="8">
          <el-col v-for="item in activity" :key="item.id" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 8}" style="margin-bottom:30px;">
            <el-card class="box-card-component" style="margin-left:8px;">
              <div slot="header" class="box-card-header">
                <img :src="item.newsImg+'/base'">
              </div>
              <h4>{{ item.newsTitle }}</h4>
              <p>{{ item.newsDescription }}</p>
            </el-card>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 8}" style="margin-bottom:30px;">
            <el-card class="box-card-component" style="margin-left:8px;text-align: center;line-height: 400px">
              <el-button @click="goToActivity">查看更多</el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="编辑">
      <el-form ref="dataForm" :rules="rules" :model="dialogData" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID">
          <el-input v-model="dialogData.id" :disabled="true"/>
        </el-form-item>
        <el-form-item label="寺庙名称" prop="imgLink">
          <el-input v-model="dialogData.templeName" />
        </el-form-item>
        <el-form-item label="寺庙描述" prop="imgLink">
          <el-input v-model="dialogData.templeDescription" />
        </el-form-item>
        <el-form-item label="寺庙简介" prop="imgDescription">
          <el-input v-model="dialogData.templeIntroduce" :rows="4" type="textarea" />
        </el-form-item>
        <el-form-item label="图片" prop="templeCoverImg">
          <el-upload
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload"
            :action="imgUrl"
            :data="{ type: 'img', folder: 'indexBanner', templeId: 0 }"
            class="avatar-uploader">
            <img v-if="dialogData.templeCoverImg" :src="dialogShowImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editIntroduction">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryTempleIntroduce, queryEditTempleIntroduce, templeMonkList, templeNewsList } from '@/api/temple'
import { imgUrl } from '@/api/images'
export default {
  name: 'TempleHome',
  data() {
    return {
      imgUrl: imgUrl,
      introduction: {
        templeCoverImg: null,
        templeName: null,
        templeIntroduce: null
      },
      monks: [],
      activity: [],
      dialogFormVisible: false,
      rules: {
        templeCoverImg: [
          { required: true, message: '请上传图片', trigger: 'change' }
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
        templeCoverImg: null,
        templeName: null,
        templeIntroduce: null,
        templeDescription: null,
        id: null
      },
      dialogShowImg: null
    }
  },
  created() {
    queryTempleIntroduce({ id: this.$route.query.id }).then(res => {
      this.introduction = res.data
    })
    templeMonkList({ bean: {}, pageNum: 1, pageSize: 3 }).then(res => {
      this.monks = res.data.list
    })
    templeNewsList({ bean: {}, pageNum: 1, pageSize: 3 }).then(res => {
      this.activity = res.data.list
    })
  },
  methods: {
    goToMonk() {
      this.$router.push({ name: 'TempleMonk', query: { id: this.$route.query.id }})
    },
    goToActivity() {
      this.$router.push({ name: 'TempleNotice', query: { id: this.$route.query.id }})
    },
    handleImgSuccess(res, file) {
      this.dialogShowImg = URL.createObjectURL(file.raw)
      this.dialogData.imgUrl = res.data
    },
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/pjpeg' || 'image/gif' || 'image/bmp' || 'image/x-png' || 'image/tiff' || 'image/png' || 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    },
    resetTemp() {
      this.dialogData = {
        templeCoverImg: null,
        templeName: null,
        templeIntroduce: null,
        templeDescription: null,
        id: null
      }
    },
    handleEdit() {
      this.dialogData = Object.assign({}, this.introduction) // copy obj
      this.dialogShowImg = this.dialogData.templeCoverImg + '/200X200'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editIntroduction() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dialogData)
          queryEditTempleIntroduce(tempData).then((res) => {
            this.introduction = res.data
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .box-card-component{
    height: 400px;
    p {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .el-card__header {
      padding: 0px!important;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    min-height: 100vh;
    .card {
      background-color: white;
      overflow: hidden;
      margin-bottom: 20px;
      .card-title {
        margin: 20px;
      }
      h3 {
        display: inline-block;
      }
      .filter-item {
        display: inline-block;
        margin-left: 10px;
      }
      .fahuiImg {
        width: 100%;
      }
    }
  }

  .box-card-component {
    .box-card-header {
      position: relative;
      height: 220px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }
  }
</style>
