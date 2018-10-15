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

export const newRouters = {
  'routes': [
    {
      'path': '/user',
      'component': Layout,
      'redirect': '/user/userList',
      'name': 'User',
      'meta': { 'title': '用户系统', 'icon': 'user' },
      'alwaysShow': true,
      'children': [
        {
          'path': 'userList',
          'name': 'UserList',
          'component': () => import('@/views/UserList/index'),
          'meta': { 'title': '用户列表', 'icon': 'user' }
        }
      ]
    },
    {
      'path': '/order',
      'component': Layout,
      'redirect': '/order/orderList',
      'name': 'Order',
      'meta': { 'title': '订单系统', 'icon': 'money' },
      'alwaysShow': true,
      'children': [
        {
          'path': 'orderList',
          'name': 'OrderList',
          'component': () => import('@/views/OrderList/index'),
          'meta': { 'title': '订单列表', 'icon': 'money' }
        }
      ]
    },
    {
      'path': '/webManager',
      'component': Layout,
      'redirect': '/webManager/home',
      'name': 'WebManager',
      'meta': { 'title': '网站管理', 'icon': 'money' },
      'alwaysShow': true,
      'children': [
        {
          'path': 'home',
          'name': 'Home',
          'component': () => import('@/views/WebManager/Home'),
          'meta': { 'title': '网站首页管理', 'icon': 'money' }
        },
        {
          'path': 'banner',
          'name': 'Banner',
          'component': () => import('@/views/WebManager/Banner'),
          'meta': { 'title': 'banner管理', 'icon': 'money', 'parents': [{ 'meta': { 'title': '网站首页管理' }, 'path': '/webManager/home' }] },
          'hidden': true
        },
        {
          'path': 'news',
          'name': 'News',
          'component': () => import('@/views/WebManager/News'),
          'meta': { 'title': '资讯管理', 'icon': 'money', 'parents': [{ 'meta': { 'title': '网站首页管理' }, 'path': '/webManager/home' }] },
          'hidden': true
        }
      ]
    },
    {
      'path': '/temple',
      'component': Layout,
      'redirect': '/temple/templeList',
      'name': 'Temple',
      'meta': { 'title': '寺庙管理', 'icon': 'money' },
      'alwaysShow': true,
      'children': [
        {
          'path': 'templeList',
          'name': 'TempleList',
          'component': () => import('@/views/Temple/TempleList'),
          'meta': { 'title': '寺庙列表', 'icon': 'money' }
        },
        {
          'path': 'TempleOrderList',
          'name': 'TempleOrderList',
          'component': () => import('@/views/Temple/TempleOrderList'),
          'meta': { 'title': '寺庙订单列表', 'icon': 'money' }
        },
        {
          'path': 'templeHome',
          'name': 'TempleHome',
          'component': () => import('@/views/Temple/TempleHome'),
          'meta': { 'title': '寺庙首页管理', 'icon': 'money' }
        },
        {
          'path': 'templeMonk',
          'name': 'TempleMonk',
          'component': () => import('@/views/Temple/TempleMonk'),
          'meta': { 'title': '寺庙僧人列表', 'icon': 'money' },
          'hidden': true
        },
        {
          'path': 'templeNotice',
          'name': 'TempleNotice',
          'component': () => import('@/views/Temple/TempleNotice'),
          'meta': { 'title': '寺庙通告列表', 'icon': 'money' },
          'hidden': true
        }
      ]
    },
    {
      'path': '/system',
      'component': Layout,
      'redirect': '/system/menuList',
      'name': 'System',
      'meta': { 'title': '系统管理', 'icon': 'money' },
      'alwaysShow': true,
      'children': [
        {
          'path': 'menuList',
          'name': 'MenuList',
          'component': () => import('@/views/system/menu/MenuList'),
          'meta': { 'title': '菜单管理', 'icon': 'money' }
        },
        {
          'path': 'merchantList',
          'name': 'MerchantList',
          'component': () => import('@/views/system/merchant/MerchantList'),
          'meta': { 'title': '商户管理', 'icon': 'money' }
        },
        {
          'path': 'roleList',
          'name': 'RoleList',
          'component': () => import('@/views/system/role/RoleList'),
          'meta': { 'title': '角色管理', 'icon': 'money' }
        }
      ]
    },

    { 'path': '*', 'redirect': '/404', 'hidden': true }
  ]
}
