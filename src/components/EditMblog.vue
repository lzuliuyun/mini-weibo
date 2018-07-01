<template>
  <div class="edit">
    <div class="edit-container">
      <div>
        <textarea v-model="content" @click="scrollToView" placeholder="你最近有什么新鲜事要分享吗？"></textarea>
      </div>
    </div>
    <div class="toolbar">
      <ul class="clearfix">
        <li><a href="#" @click="goToHome"><span></span><span>废弃</span></a></li>
        <li><a href="#" @click="saveMblog"><span></span><span>保存</span></a></li>
        <li><a href="#" @click="publishMblog"><span></span><span>发布</span></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      id: ''
    }
  },
  created () {

  },
  methods: {
    scrollToView (e) {
      document.getElementsByClassName('app-header')[0].scrollIntoView(true)
    },
    goToHome () {
      this.$router.push('/')
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
    }
  },
  computed: {
    isDraft () {
      return !!this.id
    }
  }
}
</script>

<style scoped>
.edit {
  width: 100%;
  height: 100%;
}

.edit-container {
  width: 100%;
  top: 50px;
  position: absolute;
  bottom: 45px;
}

.edit-container > div {
  margin: 0 10px;
  /* width: 100%; */
  margin-bottom: 10px;
  height: 100%;
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
  position: absolute;
  bottom: 0px;
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
  line-height: 40px;
  height: 40px;
  list-style: none;
  float: left;
  width: calc(100%/3);
}

.toolbar ul li a {
  text-decoration: none;
}

/* @media screen{
  @media (min-device-width:1078px) {
    input:focus,textarea:focus {
      font-size: 16px !important;
    }
  }

  @media (min-device-width : 320px) and (max-device-width : 1077px) {
    input:focus, textarea:focus {
      font-size: 16px !important;
    }
  }
} */
</style>
