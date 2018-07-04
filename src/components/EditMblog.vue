<template>
  <div class="edit">
    <div class="toolbar">
      <ul class="clearfix" :class="avgClass">
        <li v-if="toolbar.includes('image')"><span @click="imageUpload"><span></span><span>图片</span></span></li>
        <li v-if="toolbar.includes('save')"><span @click="saveMblog"><span></span><span>保存</span></span></li>
        <li v-if="toolbar.includes('publish')"><span @click="publishMblog"><span></span><span>发布</span></span></li>
        <li v-if="toolbar.includes('delete')"><span @click="deleteMblog"><span></span><span>废弃</span></span></li>
        <li v-if="toolbar.includes('back')"><span @click="goToHome"><span></span><span>返回</span></span></li>
      </ul>
    </div>
    <div class="edit-container">
      <div class="expanding-area">
        <pre><span>{{content}}</span><br></pre>
        <textarea v-model="content" @click="scrollToView" placeholder="你最近有什么新鲜事要分享吗？"></textarea>
      </div>
    </div>
    <div class="image-container" v-show="imageContainerVisible">
      <image-upload :images="images" :data="{mblogid: id}"></image-upload>
    </div>
  </div>
</template>

<script>
import {throttle} from 'common/util'
import ImageUpload from 'components/ImageUpload'

export default {
  data () {
    return {
      content: '',
      id: '',
      toolbar: ['image', 'save', 'publish', 'delete', 'back'],
      images: [],
      imageContainerVisible: false,
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
        return this.updateMblog(false)
      } else {
        // add new mblog but not publish
        return this.addMblog(false)
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
    },
    imageUpload (res) {
      if (!this.id) {
        this.saveMblog().then(() => {
          this.imageContainerVisible = true
        })
      } else {
        this.imageContainerVisible = true
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
  },
  components: {
    ImageUpload
  }
}
</script>

<style scoped>
.edit {
  width: 100%;
}

.edit-container {
  width: 100%;
}

.expanding-area textarea,
.expanding-area pre {
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
}

.expanding-area {
  position: relative;
  /* border: 1px solid #888;
  background: #fff; */
}

.expanding-area textarea,
.expanding-area pre {
  padding: 10px;
  font-size: 14px;
  background: transparent;
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 100px;
}

.expanding-area textarea {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  /* height: 100px; */
  width: 100%;
  position: absolute;
  top: 0;
  height: 100%;
  overflow: hidden;
}

/* .expanding-area.active textarea {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  resize: none;
} */

.expanding-area pre {
  visibility: hidden;
}
.expanding-area.active pre {
  display: block;
  visibility: hidden;
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

.toolbar ul.avg-5 li {
  width: calc(100%/5);
}

.toolbar ul li a {
  text-decoration: none;
}
</style>
