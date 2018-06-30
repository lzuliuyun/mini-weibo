<template>
  <div class="card">
    <div class="header">
      <a href=""><img src="" alt=""></a>
      <span>匿名</span>
      <span>{{time}}</span>
    </div>
    <div :class="showall ? 'content content-showall' : 'content'" @click="toggleShowAll">{{mblog.content}}</div>
    <div class="toolbar">
      <ul class="clearfix">
        <li><a href="#" class="btn-comment"><span></span><span>评论</span></a></li>
        <li><a href="#" class="btn-praise" @click="onPraise"><span></span><span>{{praise}}</span></a></li>
        <!-- <li><a href="">删除</a></li> -->
      </ul>
    </div>
    <div class="comment"></div>
    <div class="split"></div>
  </div>
</template>

<script>
import {getRelativeTimeInfo} from 'common/util'

export default {
  props: {
    mblog: {
      type: Object
    }
  },
  data () {
    return {
      showall: false,
      isParise: false
    }
  },
  methods: {
    toggleShowAll (e) {
      this.showall = !this.showall
    },
    onPraise (e) {
      this.isParise = !this.isParise
      var praise = this.isParise ? 1 : -1
      this.$http.post('/api/mblog/' + this.mblog.id + '/praise', {praise: this.mblog.praise + praise})
        .then((res) => {
          this.mblog.praise = this.mblog.praise + praise
        })
    }
  },
  computed: {
    praise () {
      return this.mblog.praise > 0 ? this.mblog.praise : '赞'
    },
    time () {
      let curDate = new Date(this.mblog.date)
      let hour = curDate.getHours() > 9 ? curDate.getHours() : '0' + curDate.getHours()
      let minute = curDate.getMinutes() > 9 ? curDate.getMinutes() : '0' + curDate.getMinutes()
      return getRelativeTimeInfo(this.mblog.date) + ' ' + hour + ':' + minute
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
  }

  .content-showall {
    max-height: none;
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

  .toolbar ul li a {
    text-decoration: none;
  }

  .toolbar ul li a span {
    vertical-align: middle;
  }

  .btn-comment span:first-of-type, .btn-praise span:first-of-type {
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

  .split {
    width: 100%;
    height: 16px;
    background-color: #f1f1f1;
  }
</style>
