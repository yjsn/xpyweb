import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const routesPath = {
  UserList: () => import('@/views/UserList/index'),
  OrderList: () => import('@/views/OrderList/index'),
  WebManagerHome: () => import('@/views/WebManager/Home'),
  WebManagerBanner: () => import('@/views/WebManager/Banner'),
  WebManagerNews: () => import('@/views/WebManager/News'),
  TempleHome: () => import('@/views/Temple/TempleHome'),
  TempleList: () => import('@/views/Temple/TempleList'),
  TempleMonk: () => import('@/views/Temple/TempleMonk'),
  TempleNotice: () => import('@/views/Temple/TempleNotice'),
  MenuList: () => import('@/views/system/menu/MenuList'),
  MerchantList: () => import('@/views/system/merchant/MerchantList'),
  RoleList: () => import('@/views/system/role/RoleList')
}

/**
* hidden: true                   是否在菜单栏显示
* alwaysShow: true               无论child长度，始终在菜单栏显示树级
* redirect: noredirect           重定向
* name:'router-name'             路由名字
* meta : {
    title: 'title'               显示的中文名字
    icon: 'svg-name'             icon的名字
    parents: array               父级，主要用于面包屑
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
