<template>
  <div class="card">
    <div class="header">
      <a href=""><img src="" alt=""></a>
      <span>匿名</span>
      <span>{{time}}</span>
    </div>
    <div :class="showall ? 'content content-showall' : 'content'" @click="toggleShowAll">{{mblog.content}}</div>
    <div class="images clearfix">
      <image-display :images="images"></image-display>
    </div>
    <div class="toolbar">
      <ul class="clearfix">
        <li v-if="toolbar.includes('comment')"><div class="btn-comment" @click="onComment"><span></span><span>{{commentNum}}</span></div></li>
        <li v-if="toolbar.includes('praise')"><div class="btn-praise" @click="onPraise"><span></span><span>{{praise}}</span></div></li>
        <li v-if="toolbar.includes('delete')"><div class="btn-delete" @click="onDelete"><span></span><span>删除</span></div></li>
        <li v-if="toolbar.includes('edit')"><div class="btn-edit" @click="onEdit"><span></span><span>编辑</span></div></li>
      </ul>
    </div>
    <div class="comment" v-if="commentState">
      <div v-if="comments.length">
        <comment-display v-for="(comment, index) in comments" :comment="comment" :key="index" @commentDeleteSuccess="onCommentDeleteSuccess"></comment-display>
      </div>
      <div class="comment-input-container">
        <input type="text" @focus="onCommentInputFocus" placeholder="小姐姐，小哥哥，快来来评论我呀">
      </div>
    </div>
    <div class="split"></div>
  </div>
</template>

<script>
import {getRelativeTimeInfo} from 'common/util'
import ImageDisplay from 'components/ImageDisplay'
import CommentDisplay from 'components/CommentDisplay'
import Comment from 'components/Comment'
import {mapGetters} from 'vuex'

export default {
  props: {
    mblog: {
      type: Object
    },
    toolbar: {
      type: Array,
      default: function () {
        return ['comment', 'praise']
      }
    },
    type: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {
      images: [],
      comments: [],
      showall: false,
      isParise: false,
      clickStartY: 0,
      commentState: false
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    getImages () {
      this.$http.get('/api/image', {
        params: {
          mblogid: this.mblog.id
        }
      }).then((res) => {
        this.images = res.data
      })
    },
    toggleShowAll (e) {
      !this.showall && (this.clickStartY = window.pageYOffset)

      this.showall = !this.showall

      if (!this.showall) {
        window.scrollTo(0, this.clickStartY)
      }
    },
    onPraise (e) {
      this.isParise = !this.isParise
      var praise = this.isParise ? 1 : -1
      this.$http.post('/api/mblog/' + this.mblog.id + '/praise', {praise: this.mblog.praise + praise})
        .then((res) => {
          this.mblog.praise = this.mblog.praise + praise
        })
    },
    onDelete () {
      this.$http.delete('/api/mblog/' + this.mblog.id)
        .then((res) => {
          this.$emit('mblogDelete', this.mblog.id)
        }, (err) => {
          console.log(err)
        })
    },
    onEdit () {
      this.$router.push({
        name: 'edit',
        params: {
          mblog: this.mblog,
          toolbar: this.type === 'draft' ? ['save', 'publish', 'back'] : ['save', 'publish', 'delete', 'back']
        }
      })
    },
    onComment () {
      this.commentState = !this.commentState
      this.commentState && this.$http.get('/api/comment', { params: { mblogid: this.mblog.id } })
        .then((res) => {
          this.comments = res.data
        })
    },
    onCommentInputFocus () {
      this.$router.push({
        name: 'comment',
        params: {
          mblog: this.mblog
        }
      })
    },
    onCommentDeleteSuccess (id) {
      this.comments = this.comments.filter((comment) => {
        return comment.id !== id
      })
    }
  },
  computed: {
    praise () {
      return this.mblog.praise > 0 ? this.mblog.praise : '赞'
    },
    commentNum () {
      return this.mblog.commentNum > 0 ? this.mblog.commentNum : '评论'
    },
    time () {
      let curDate = new Date(this.mblog.date)
      let hour = curDate.getHours() > 9 ? curDate.getHours() : '0' + curDate.getHours()
      let minute = curDate.getMinutes() > 9 ? curDate.getMinutes() : '0' + curDate.getMinutes()
      return getRelativeTimeInfo(this.mblog.date) + ' ' + hour + ':' + minute
    },
    ...mapGetters(['commentAdded'])
  },
  components: {
    ImageDisplay,
    Comment,
    CommentDisplay
  },
  watch: {
    commentAdded (newComment, oldComment) {
      if (newComment.mblogid === this.mblog.id) {
        this.mblog.commentNum++
        this.comments = this.comments.concat(newComment)
      }
    }
  }
}
</script>

<style scoped>
  .card {
    /* background-color: #f2f2f5; */
    /* padding: 10px;
    border: 1px solid red; */
    border-radius: 2px
  }

  .header {
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    padding: 5px 10px;
    font-weight: bold;
    background-color: #fafafa;
  }

  .content {
    padding: 5px 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    max-height: 200px;
    word-wrap: break-word;
    text-align: left;
    white-space: pre-wrap;
  }

  .content-showall {
    max-height: none;
  }

  .images {
    z-index: -1;
    position: relative;
  }

  .toolbar ul {
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    background-color: #fafafa;
    padding: 0;
    margin: 0;
    padding-right: 10px;
  }

  .toolbar ul li {
    list-style: none;
    float: right;
    padding: 5px 10px;
  }

  .toolbar ul li a span {
    vertical-align: middle;
  }

  .toolbar ul li span:first-of-type {
    vertical-align: middle;
    background-size: cover;
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: .2em;
    background-repeat: no-repeat;
  }

  .btn-praise span:first-of-type {
    background-image: url(../../static/images/good.svg);
  }

  .btn-comment span:first-of-type {
    background-image: url(../../static/images/comment.svg);
  }

  .btn-edit span:first-of-type {
    background-image: url(../../static/images/edit.svg);
  }

  .btn-delete span:first-of-type {
    background-image: url(../../static/images/delete.svg);
  }

  .comment-input-container {
    background-color: #fafafa;
    position: relative;
    width: 100%;
    padding: .5em;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb;
  }

  .comment-input-container input {
    width: 100%;
    margin: 0;
    padding: 0;
    height: 2em;
    border: 1px solid #ebebeb;
    text-indent: 5px;
  }

  .split {
    width: 100%;
    height: 16px;
    background-color: #f1f1f1;
  }
</style>
