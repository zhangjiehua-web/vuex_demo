<template>
  <div>
    <may-add></may-add>
    <p>--------------------------------</p>
    <my-subtraction></my-subtraction>
  </div>
</template>

<script>
import add from './components/add' //  导入组件
import subtraction from './components/subtraction'
export default {
  name: 'App',
  components: { //  注册为私有组件
    'may-add': add,
    'my-subtraction': subtraction
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
