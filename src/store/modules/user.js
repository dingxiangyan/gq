import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Vue from 'vue'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    usernumber:'',
    // roles: ['admin','editor'],
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      // console.log(token)
      state.token = token
      // this.$router.push('/')
      // console.log(state.token)
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERNUMBER: (state, usernumber) => {
      state.usernumber = usernumber
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        
        let param = {
        userNumber:username,
        passWord:userInfo.password
        };
        // fe43fe8e-511a-4e6d-8cce-8a866f952f4a
      Vue.http.post("checklogin",param).then((res)=>{
        // console.log(res.data.data.sessionId)
        // if(res)
        // Cookie.set('token',res.data.data.sessionId)
        commit('SET_TOKEN', res.data.data.sessionId)
        setToken(res.data.data.sessionId)
        // console.log(res.data.data)
        // setToken(res.data.data)
       
        console.log(res)
        return resolve()
      }).catch((err)=>{
        reject(alert('用户名或密码错误'))
        // alert('登录失败，请重新登录');
        // loding = true;
        // console.log(loding)
        // this.getters.strict = true;
        // console.log(this);
        
      })
        // const data = 
        // console.log(data)
        // loginByUsername(username, userInfo.password).then(response => {
        //   const data = response.data
          
        //   commit('SET_TOKEN', data.token)
        //   setToken(response.data.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      // console.log(state)
      return new Promise((resolve, reject) => {
    //     Vue.http.post('sso_getuser').then((response)=>{  
    //   console.log(response)
    //   if(response.code==='999'){
    //     let res = {};
    //     res.data = {};
    //     res.data.token = token;
    //     res.data.roles = response.data.userRoot;
    //     res.data.name = response.data.userName;
    //     res.data.avatar = 'http://www.avatar.com/avatar';
    //     // res.data.introduction = response.data.userid;
    //     // return res;
    //   }else{
    //     console.log('调用接口获取用户信息失败')
    //   }
      
    // })
    // resolve(res);
   
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          console.log(data)
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_USERNUMBER', data.usernumber)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
       
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
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
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_USERNUMBER', data.usernumber)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
