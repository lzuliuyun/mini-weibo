<template>
  <div class="comment">
    <div class="toolbar">
      <ul class="clearfix">
        <li><span @click="publishComment"><span></span><span>发布</span></span></li>
        <li><span @click="goToHome"><span></span><span>返回</span></span></li>
      </ul>
    </div>
    <div class="comment-container">
      <div>
        <textarea v-model="content" @click="scrollToView" placeholder="小姐姐、小哥哥想评论什么呢"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      content: '',
      mblogid: ''
    }
  },
  created () {
    if (this.$route.params.mblog) {
      this.mblogid = this.$route.params.mblog.id || ''
    }
  },
  methods: {
    scrollToView (e) {
      document.getElementsByClassName('toolbar')[0].scrollIntoView(true)
    },
    goToHome () {
      this.$router.back()
    },
    publishComment () {
      let comment = {
        content: this.content,
        mblogid: this.mblogid
      }

      this.mblogid && this.$http.post('/api/comment', comment).then((res) => {
        comment.date = res.data.date
        this.commentAdded(comment)
        this.goToHome()
      }, (err) => {
        console.log(err)
      })
    },
    ...mapMutations({
      commentAdded: 'SET_COMMENT_ADDED'
    })
  }
}
</script>

<style scoped>
.comment {
  width: 100%;
}

.comment-container {
  width: 100%;
  height: calc(100% - 50px - 32px);
  position: absolute;
}

.comment-container > div {
  padding: 10px 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.comment-container div textarea {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  resize: none;
  font-size: 15px;
}

.toolbar {
  width: 100%;
}

.toolbar ul {
  padding: 0;
  margin: 0;
  text-align: center;
  vertical-align: middle;

  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  background-color: #fafafa;
}

.toolbar ul li {
  line-height: 30px;
  height: 30px;
  list-style: none;
  float: left;
  width: calc(100%/2);
  box-sizing: border-box;
  border-right: 1px solid #eee;
  border-radius: 1px;
}

.toolbar ul li a {
  text-decoration: none;
}
</style>
