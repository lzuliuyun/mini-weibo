<template>
  <div>
    <ul>
      <li v-for="(image, index) in images" :key="index">
        <div class="image-container">
          <span class="btn-image-delete" @click="deleteImage(image)"></span>
          <img :src="image.path">
        </div>
      </li>
      <li class="btn-upload" v-if="images.length < 9">
          <vue-core-image-upload
            text=''
            class="btn btn-primary"
            :crop="false"
            inputOfFile="image"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            :multiple="true"
            :multiple-size="9"
            :data="data"
            url="/api/image">
          </vue-core-image-upload>
      </li>
    </ul>
  </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    images: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    imageuploaded (res) {
      this.images = this.images.concat(res)
    },
    deleteImage (image) {
      this.$http.delete('/api/image/' + image.id)
        .then(() => {
          this.images = this.images.filter((img) => {
            return img.id !== image.id
          })
        })
    }
  },
  components: {
    VueCoreImageUpload
  }
}
</script>

<style scoped>
  ul {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  ul li {
    float: left;
    list-style: none;
    width: calc(100vw/3);
    height: calc(100vw/3);
    box-sizing: border-box;
    padding: 5px;
    display: inline-block;
    vertical-align: top; /*not required*/
    position: relative;
  }

  ul li img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
  }

  ul li .image-container {
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px solid #eee;
    border-radius: 3px;
  }

  ul li.btn-upload div {
    width: 100%;
    height: 100%;
    border: 1px dashed #333;
    border-radius: 5px;
    background-size: 30%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(../../static/images/add-image.svg);
  }

  .btn-image-delete {
    float: right;
    right: 5px;
    top: 5px;
    background-image: url(../../static/images/delete-image.svg);
    width: 15px;
    height: 15px;
    display: block;
    background-size: cover;
    z-index: 1;
  }
</style>
