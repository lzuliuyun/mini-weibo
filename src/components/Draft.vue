<template>
  <div>
      <div class="title">
        <span>草稿箱</span>
        <router-link to="/"><span></span><span>返回</span></router-link>
      </div>
      <div class="draft-container">
        <mblog v-for="mblog in mblogs" :mblog="mblog" :key="mblog.id" @mblogDelete="onMblogDelete" :toolbar="toolbar" :type="type"></mblog>
      </div>
  </div>
</template>

<script>
import Mblog from 'components/Mblog'

export default {
  data () {
    return {
      type: 'draft',
      mblogs: [],
      toolbar: ['edit', 'delete']
    }
  },
  created () {
    this.$http.get('/api/draft')
      .then((res) => {
        this.mblogs = res.data
      })
  },
  methods: {
    onMblogDelete (id) {
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
  .title {
    padding:0.5em 1em;
    font-weight: bold;
    background-color: #f1f1f1;
    position: fixed;
    width: 100%;
    top: 40px;
  }

  .title a {
    vertical-align: middle;
    padding: 1px;
    background-size: cover;
    float: right;
    margin-right: 2em;
    text-decoration: none;
    color: #333;
  }

  .title a span:first-of-type {
    vertical-align: middle;
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1em;
    padding: 1px;
    background-size: cover;
    margin-right: .5em;
    background-image: url(../../static/images/back.svg);
  }

  .draft-container {
    margin-top: calc(1em + 10px);
  }
</style>
