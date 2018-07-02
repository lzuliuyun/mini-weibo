<template>
  <div class="comment-list-container">
    <div class="comment-list">
      <div class="comment-info">
        <span>匿名:</span>
        <span>{{time}}</span>
        <span class="btn-delete" @click="onDelete"><span></span>删除</span>
      </div>
      <div class="comment-content">
        <span>{{comment.content}}</span>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import {getRelativeTimeInfo} from 'common/util'
export default {
  props: {
    comment: {
      type: Object
    }
  },
  methods: {
    onDelete () {
      this.$http.delete('/api/comment/' + this.comment.id)
        .then((res) => {
          this.$emit('commentDeleteSuccess', this.comment.id)
        }, () => {

        })
    }
  },
  computed: {
    time () {
      let curDate = new Date(this.comment.date)
      let hour = curDate.getHours() > 9 ? curDate.getHours() : '0' + curDate.getHours()
      let minute = curDate.getMinutes() > 9 ? curDate.getMinutes() : '0' + curDate.getMinutes()
      return getRelativeTimeInfo(this.comment.date) + ' ' + hour + ':' + minute
    }
  }
}
</script>

<style scoped>
  .comment-list {
    padding: 10px;
  }

  .comment-info {
    padding-bottom: 5px;
    font-size: 10px;
  }

  .btn-delete {
    float: right;
  }

  .btn-delete span {
    background-image: url(../../static/images/delete.svg);
    display: inline-block;
    width: 1em;
    height: 1em;
    background-repeat: no-repeat;
    background-size: cover;
    line-height: 1em;
    vertical-align: middle;
    margin-right: 0.5em;
    text-align: center;
  }

  .comment-content {
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    text-align: left;
    white-space: pre-wrap;
    font-size: 12px;
  }
  .comment-list:nth-child(odd) {
    /* background-color: pink; */
  }

  .comment-list-container:nth-child(even) {
    background-color: #fafafa;
  }

  .comment-list-container hr {
    background-color: #ebebeb;
    border: none;
    height: 1px;
    margin: 0 1em;
  }
</style>
