import Vue from 'vue'
import App from './App.vue'
import store from './store' // 4导入store
// 1、导入ant-design-vue 组件库
import Antd from 'ant-design-vue'

// 2、导入组件库的样式表
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
// 3、安装组件库
Vue.use(Antd)

new Vue({ // 5 new vue 实例并挂载store，至此，vue项目的组件都可以访问store中共享的全局数据
  store,
  render: h => h(App)
}).$mount('#app')
