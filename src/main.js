import Vue from 'vue'
import App from './App.vue'
import store from './store' // 4导入store

Vue.config.productionTip = false

new Vue({ // 5 new vue 实例并挂载store，至此，vue项目的组件都可以访问store中共享的全局数据
  store,
  render: h => h(App)
}).$mount('#app')
