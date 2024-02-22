import { login, logout, getInfo,usergetinfo} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import {adminsearch, getadmin} from '@/api/admin'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    age:[],
    weight:[],
    gender:[],
    age_num:'',
    userinformation:{},
    uinfo:{}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AGE: (state, age) => {
    state.age = age
  },
  SET_WEIGHT: (state, weight) => {
    state.weight = weight
  },
  SET_GENDER: (state, gender) => {
    state.gender = gender
  },
  SET_AGENUM:(state,num)=>{
    state.age_num=num
  },
  SET_USERINFORMATION:(state,userinformation)=>{
    state.userinformation=userinformation
  },
  SET_INFO:(state,data)=>{
    state.uinfo=data
  },
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    //解构出用户名与密码
    const { username, password } = userInfo;
    let result = await login({ userName: username.trim(), password: password });
    //注意：当前登录请求现在使用mock数据，mock数据code是20000
    if (result.code == 0) {
      //vuex存储token
      commit('SET_TOKEN', result.data);
      //本地持久化存储token
      setToken(result.data);
      return 'ok';
    } else {
      
      return Promise.reject(new Error('faile'));
    }
  },
  async getinfo({commit}){
    let result = await usergetinfo()
    if(result.code ==0){
      commit('SET_INFO',result.data)
    }
  },
  async Getadmin({commit}){
    let result = await getadmin();
    if(result.code ==0){
      commit('SET_AGE',result.data.age)
      commit('SET_WEIGHT',result.data.weight)
      commit('SET_GENDER',result.data.gender)
     
     
      return 'ok'
    }
    else{
      return Promise.reject(new Error('faile'));
    }
  },
  async Adminsearch({commit}){
    let result = await adminsearch();
    if(result.code ==0){
      commit('SET_USERINFORMATION',result.data)
      return 'ok'
    }
    else{
      return Promise.reject(new Error('faile'));
    }
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

