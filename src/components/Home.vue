<template>
  <div>
      <div class="mblog-container">
        <mblog v-for="mblog in mblogs" :mblog="mblog" :key="mblog.id"></mblog>
      </div>
      <div class="add-container">
        <a href="#" @click="startEdit"></a>
      </div>
  </div>
</template>

<script>
import Mblog from 'components/Mblog'

export default {
  data () {
    return {
      mblogs: []
    }
  },
  created () {
    this.$http.get('/api/mblog')
      .then((res) => {
        this.mblogs = res.data
      })
  },
  methods: {
    startEdit () {
      this.$router.push('/edit')
    }
  },
  components: {
    Mblog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .add-container {
    position: fixed;
    right: 40px;
    bottom: 100px;
  }

  .add-container a {
    display: block;
    background-image: url(../../static/images/add.svg);
    background-size: 90%;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
  }
</style>
