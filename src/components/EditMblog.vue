<template>
  <div class="edit">
    <div class="toolbar">
      <ul class="clearfix" :class="avgClass">
        <li v-if="toolbar.includes('save')"><span @click="saveMblog"><span></span><span>保存</span></span></li>
        <li v-if="toolbar.includes('publish')"><span @click="publishMblog"><span></span><span>发布</span></span></li>
        <li v-if="toolbar.includes('delete')"><span @click="deleteMblog"><span></span><span>废弃</span></span></li>
        <li v-if="toolbar.includes('back')"><span @click="goToHome"><span></span><span>返回</span></span></li>
      </ul>
    </div>
    <div class="edit-container">
      <div>
        <textarea v-model="content" @click="scrollToView" placeholder="你最近有什么新鲜事要分享吗？"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {throttle} from 'common/util'

export default {
  data () {
    return {
      content: '',
      id: '',
      toolbar: ['save', 'publish', 'delete', 'back'],
      throttleSaveMblogFun: null
    }
  },
  created () {
    this.initSaveInterval()

    if (this.$route.params.mblog) {
      this.content = this.$route.params.mblog.content || ''
      this.id = this.$route.params.mblog.id || ''
    }

    this.$route.params.toolbar && (this.toolbar = this.$route.params.toolbar)
  },
  methods: {
    scrollToView (e) {
      document.getElementsByClassName('toolbar')[0].scrollIntoView(true)
    },
    initSaveInterval () {
      this.throttleSaveMblogFun = throttle(this.saveMblog, 3 * 1000)
    },
    goToHome () {
      this.throttleSaveMblogFun.cancel()

      this.$router.back()
    },
    saveMblog () {
      if (this.isDraft) {
        this.updateMblog(false)
      } else {
        // add new mblog but not publish
        this.addMblog(false)
      }
    },
    publishMblog () {
      if (this.isDraft) {
        this.updateMblog(true).then(() => {
          this.goToHome()
        })
      } else {
        this.addMblog(true).then(() => {
          this.goToHome()
        })
      }
    },
    addMblog (publish) {
      return this.$http.post('/api/mblog', {content: this.content, publish: publish})
        .then((res) => {
          this.id = res.data.insertId
        }, (err) => {
          console.log(err)
        })
    },
    updateMblog (publish) {
      // add new mblog but not publish
      return this.$http.put('/api/mblog/' + this.id, {content: this.content, publish: publish})
        .then((res) => {
        }, (err) => {
          console.log(err)
        })
    },
    deleteMblog () {
      if (this.isDraft && this.id) {
        return this.$http.delete('/api/mblog/' + this.id)
          .then((res) => {
            this.goToHome()
          }, (err) => {
            console.log(err)
          })
      } else {
        this.goToHome()
      }
    }
  },
  computed: {
    isDraft () {
      return !!this.id
    },
    avgClass () {
      return 'avg-' + this.toolbar.length
    }
  },
  watch: {
    content () {
      this.throttleSaveMblogFun()
    }
  }
}
</script>

<style scoped>
.edit {
  width: 100%;
}

.edit-container {
  width: 100%;
  height: calc(100% - 50px - 32px);
  position: absolute;
}

.edit-container > div {
  padding: 10px 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.edit-container div textarea {
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
  box-sizing: border-box;
  border-right: 1px solid #eee;
  border-radius: 1px;
}

.toolbar ul.avg-3 li {
  width: calc(100%/3);
}

.toolbar ul.avg-4 li {
  width: calc(100%/4);
}

.toolbar ul li a {
  text-decoration: none;
}
</style>
