<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <div class="card">
        <div class="card-title">
          <h3>banner页面管理</h3>
          <el-button class="filter-item" type="primary" @click="goToBanner">管理</el-button>
        </div>
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in banners" :key="item.id">
            <img :src="item.imgUrl + '/base'" alt="">
            <div class="cardText">
              <h3>{{ item.imgDescription }}</h3>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="card" style="padding-right: 9px;">
        <div class="card-title">
          <h3>资讯管理</h3>
          <el-button class="filter-item" type="primary" @click="goToNews">管理</el-button>
        </div>
        <el-row :gutter="8">
          <el-col v-for="item in news" :key="item.id" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 8}" style="margin-bottom:30px;">
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
              <el-button @click="goToNews">查看更多</el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="card">
        <div class="card-title">
          <h3>法会信息管理</h3>
          <el-button class="filter-item" type="primary">管理</el-button>
        </div>
        <div style="padding: 10px">
          <img src="https://www.3dmgame.com/uploads/allimg/130717/244-130GGG527.jpg" alt="" class="fahuiImg">
          <h4>我是标题</h4>
          <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { indexBannerList, indexNewsList, religiousCeremonies } from '@/api/home'
export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      news: []
    }
  },
  created() {
    indexBannerList().then(res => {
      this.banners = res.data
    })
    indexNewsList({ bean: {}, pageNum: 1, pageSize: 3 }).then(res => {
      this.news = res.data
    })
    religiousCeremonies().then()
  },
  methods: {
    goToBanner() {
      this.$router.push({ name: 'Banner' })
    },
    goToNews() {
      this.$router.push({ name: 'News' })
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
  .el-carousel__item h3 {
    color: #fff;
    font-size: 14px;
    opacity: 0.75;
    line-height: 35px;
    text-indent: 10px;
    margin: 0;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .el-carousel__item img {
    width: 100%;
  }
  .el-carousel__item .cardText {
    background-color: #000;
    opacity: 0.75;
    position: absolute;
    z-index: 99;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
