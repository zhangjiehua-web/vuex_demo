import Vue from 'vue'
import Vuex from 'vuex' //  1导入vuex

Vue.use(Vuex) //  2将vuex安装到项目中

export default new Vuex.Store({ //  3通过new创建store实例并暴露实例
  state: { //  state提供唯一的共享数据源，所有的共享数据都要统一放到state中进行存储
    count: 0
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
    }
  }
})
