import { login, logout, newRoutersOnline } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { newRouters } from '@/router/index'

/* Layout
import Layout from '@/views/layout/Layout' */

// var myFetch = async() => {
//   try {
//     const response = await fetch('./static/routes.json', {
//       method: 'get',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include',
//       cache: 'force-cache',
//       mode: 'cors'
//     })
//     const data = await response.json()
//     return data
//   } catch (e) {
//     console.log('Oops, error', e)
//   }
// }
// function recursionRouter(userRouter = [], routesPath = {}) {
//   userRouter.forEach((item, index) => {
//     if (item.component === 'Layout') {
//       item.component = Layout
//     } else {
//       item.component = routesPath[item.component]
//     }
//     if (item.children && item.children.length > 0) {
//       recursionRouter(item.children, routesPath)
//     }
//   })
//   return userRouter
// }

function recursionRouters(userRouter = [], newRouters = []) {
  var addRouter = []
  userRouter.forEach((userRouterItem, index) => {
    newRouters.forEach((newRoutersItem, index) => {
      if (newRoutersItem.path === userRouterItem.path) {
        const item = newRoutersItem
        if (userRouterItem.children) {
          const children = recursionRouters(userRouterItem.children, newRoutersItem.children)
          if (children.length) {
            item.children = children
          }
        }
        addRouter.push(item)
      }
    })
  })
  return addRouter
}

const user = {
  state: {
    token: getToken(),
    routes: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROUTES: (state, roles) => {
      state.routes = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.accountNumber.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.accountPassword).then(response => {
          setToken('login')
          commit('SET_TOKEN', 'login')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetRoutes({ commit, state }) {
      return new Promise((resolve, reject) => {
        newRoutersOnline().then(res => {
          const newRoutes = recursionRouters(res.data, newRouters.routes)
          commit('SET_ROUTES', [...router.options.routes, ...newRoutes])
          resolve(newRoutes)
        }).catch(error => {
          reject(error)
        })
        // myFetch().then(response => {
        //   var newRoutes = recursionRouter(response.routes, routesPath)
        //   commit('SET_ROUTES', [...router.options.routes, ...newRoutes])
        //   resolve(newRoutes)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROUTES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
