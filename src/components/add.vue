<template>
  <div>
    <h3>{{$store.getters.shouNum}}</h3>
    <button @click="btnHandler1">+1</button>
    <button @click="btnHandler2">+N</button>
    <button @click="btnHandler3">+1sync</button>
    <button @click="btnHandler4">+Nsync</button>
  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {}
  },
  methods: {
    btnHandler1 () {
      //  commit的作用就是调用某个mutation函数
      this.$store.commit('add')
    },
    btnHandler2 () {
      this.$store.commit('addN', 5)
    },
    btnHandler3 () {
      //  commit的作用就是调用某个mutation函数
      this.$store.dispatch('addSync')
    },
    btnHandler4 () {
      //  dispatch用来触发store中的action
      this.$store.dispatch('addNSync', 5)
    }
  }
}
</script>

<style scoped>

</style>
