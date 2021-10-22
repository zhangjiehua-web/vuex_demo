import Vue from 'vue'
import Vuex from 'vuex' //  1导入vuex
import axios from 'axios'
Vue.use(Vuex) //  2将vuex安装到项目中

export default new Vuex.Store({ //  3通过new创建store实例并暴露实例
  state: { //  state提供唯一的共享数据源，所有的共享数据都要统一放到state中进行存储
    count: 0,
    //  以下为vuex案例
    list: [],
    inputVal: '',
    nextid: 5,
    light: 'all'
  },
  // mutations用于变更Store中的数据
  //  只能通过mutations变更Store数据，不能在组件中直接操作Store数据
  //  优势：集中监控所有数据变化
  //  只能定义同步操作，不能执行异步操作
  mutations: {
    add (state) {
      state.count++
    },
    addN (state, step) {
      state.count += step
    },
    subtraction (state) {
      state.count--
    },
    subtractionN (state, step) {
      state.count -= step
    },
    //  以下为vuex案例
    //  初始化list
    initList (state, list) {
      state.list = list
    },
    //  输入框和state双向绑定
    setinputval (state, val) {
      state.inputVal = val
    },
    //  添加任务
    additem (state, val) {
      const obj = {
        id: state.nextid,
        info: state.inputVal.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextid++
      state.inputVal = ''
    },
    removeitem (state, id) {
      //  根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      //  根据索引删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    //  修改列表项的选中状态
    changestatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    //  清除已完成任务
    clear (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    //  改变按钮高亮状态
    changeView (state, key) {
      state.light = key
    }
  },
  //  action用于处理异步任务
  //  action中要通过触发mutation的方式间接变更数据
  actions: {
    addSync (context) {
      setTimeout(() => {
        context.commit('add')
      }, 2000)
    },
    addNSync (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 2000)
    },
    subSync (context) {
      setTimeout(() => {
        context.commit('subtraction')
      }, 2000)
    },
    subNSync (context, step) {
      setTimeout(() => {
        context.commit('subtractionN', step)
      }, 2000)
    },
    //  以下为vuex案例
    //  异步初始化list事件
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  modules: {
  },
  //  getters用于对store中的数据进行加工处理形成新的数据
  //  getters不会修改store中的原数据，类似vue的计算属性
  //  store中的数据发生变化，getter中的数据也会跟着变化。
  getters: {
    shouNum (state) {
      return '当前最新的数量是[' + state.count + ']'
    },
    //  以下为vuex案例
    //  统计未完成任务条数
    undonelen (state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist (state) {
      if (state.light === 'all') {
        return state.list
      }
      if (state.light === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if (state.light === 'done') {
        return state.list.filter(x => x.done === true)
      }
    }
  }
})
