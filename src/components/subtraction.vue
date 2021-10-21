<template>
<div>
  <h3>{{shouNum}}</h3>
  <button @click="btnHandler1">-1</button>
  <button @click="btnHandler2">-N</button>
  <button @click="btnHandler3">-1sync</button>
  <button @click="btnHandler4">-Nsync</button>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'subtraction',
  data () {
    return {}
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['shouNum'])
  },
  methods: {
    ...mapMutations(['subtraction', 'subtractionN']),
    ...mapActions(['subSync', 'subNSync']),
    btnHandler1 () {
      this.subtraction()
    },
    btnHandler2 () {
      this.subtractionN(5)
    },
    btnHandler3 () {
      this.subSync()
    },
    btnHandler4 () {
      this.subNSync(5)
    }
  }
}
</script>

<style scoped>

</style>
