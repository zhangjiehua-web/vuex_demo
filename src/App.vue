<!--vuex基础开始-->
<!--<template>-->
<!--  <div>-->
<!--    <may-add></may-add>-->
<!--    <p>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</p>-->
<!--    <my-subtraction></my-subtraction>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import add from './components/add' //  导入组件-->
<!--import subtraction from './components/subtraction'-->
<!--export default {-->
<!--  name: 'App',-->
<!--  components: { //  注册为私有组件-->
<!--    'may-add': add,-->
<!--    'my-subtraction': subtraction-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--vuex基础结束-->
<!--vuex案例-->
<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" v-model="inputVal" @change="handleinputchange"/>
    <a-button type="primary" @click="additemTolist">添加事项</a-button>

    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{stateChange(e, item.id)}">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeitenByid(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{undonelen}}条剩余</span>
        <a-button-group>
          <a-button :type = "light === 'all'? 'primary': 'default'" @click="changeView('all')">全部</a-button>
          <a-button :type = "light === 'undone'? 'primary': 'default'" @click="changeView('undone')">未完成</a-button>
          <a-button :type = "light === 'done'? 'primary': 'default'" @click="changeView('done')">已完成</a-button>
        </a-button-group>
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputVal', 'light']),
    ...mapGetters(['undonelen', 'infolist'])
  },
  methods: {
    ...mapMutations(['setinputval']),
    //  监听文本框内容变化
    handleinputchange (e) {
      this.setinputval(e.target.value)
    },
    //  向列表中新增item项
    additemTolist () {
      if (this.inputVal.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      }
      this.$store.commit('additem')
    },
    //  根据id删除对应的任务项
    removeitenByid (id) {
      this.$store.commit('removeitem', id)
    },
    //  监听复选框选中状态变化
    stateChange (e, id) {
      // console.log(e.target.checked, id)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changestatus', param)
    },
    //  清除已完成任务
    clear () {
      this.$store.commit('clear')
    },
    //  改变按钮高亮状态
    changeView (key) {
      this.$store.commit('changeView', key)
    }
  }
}
</script>
<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
