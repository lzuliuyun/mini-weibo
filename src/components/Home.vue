<template>
  <div>
      <div class="mblog-container">
        <mblog v-for="mblog in mblogs" @mblogDelete="onDelete" :mblog="mblog" :key="mblog.id"></mblog>
      </div>
      <div class="toolbar-container">
        <router-link to="edit" class="edit"></router-link>
        <router-link to="draft" class="draft"></router-link>
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
    onDelete (id) {
      this.mblogs = this.mblogs.filter((mblog) => {
        return mblog.id !== id
      })
    }
  },
  components: {
    Mblog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toolbar-container {
    position: fixed;
    right: 40px;
    bottom: 100px;
  }

  .toolbar-container a {
    display: block;
    background-size: 90%;
    width: 30px;
    height: 30px;
    padding: 5px 0;
    background-repeat: no-repeat;
  }

  .toolbar-container a.edit {
    background-image: url(../../static/images/add.svg);
  }

  .toolbar-container a.draft {
    background-image: url(../../static/images/draft.svg);
  }
</style>
